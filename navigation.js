import { fetchBook, fetchGenreBook, fetchSearchBook } from "./APIs/bookApi.js";

const navSearch = document.querySelector(".new_search");
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");
const newSearchBar = document.querySelector(".new_search .search-bar");
const newSearchButton = document.querySelector(".new_search .search-button");
const toggleButton = document.querySelector(".toggle_btn");
const toggleButtonIcon = document.querySelector(".toggle_btn i");
const dropdownMenu = document.querySelector(".dropdown_menu");
const page = document.querySelector(".page");
const toggleSearchButton = document.querySelector(".src_btn2");
const dropdownBookList = document.querySelector(".book_dropdown_menu");
const allBooksComp = document.querySelector(".book_list_homepage");

function showPage(pageId, search, status) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("active"));

  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add("active");
  }

  loadPageScript(pageId, search, status);
}

function loadPageScript(pageId, search, status) {
  switch (pageId) {
    case "home":
      import("./Pages/home.js")
        .then((module) => module.homePage(search, status))
        .catch((error) =>
          console.error("Failed to load home page script:", error)
        );
      break;
    case "wishlist":
      import("./Pages/wishlist.js")
        .then((module) => module.wishlistPage())
        .catch((error) =>
          console.error("Failed to load about page script:", error)
        );
      break;
    case "contact":
      import("./Pages/contact.js")
        .then((module) => module.contactPage())
        .catch((error) =>
          console.error("Failed to load contact page script:", error)
        );
      break;
    default:
      console.warn("No script found for page:", pageId);
  }
}

function handleNavigation() {
  const currentHash = window.location.hash.substring(1) || "home";
  showPage(currentHash);
}

let controller = null;

function fetchSearchedBookWithCallback(search, callback) {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();

  fetchSearchBook(search, { signal: controller.signal })
    .then(callback)
    .catch((error) => {
      console.error("Error while Searching:", error);
      callback({ error: "An unknown error occurred" });
    });
}

export function initApp() {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const pageId = link.getAttribute("href").substring(1);
      window.location.hash = pageId;
      showPage(pageId, search);
    });
  });
  //--------------------------------------------------------------------------------------------------
  const selectMenu = document.querySelector(".book_dropdown_menu");
  let values = selectMenu.value;
  selectMenu.addEventListener("change", function () {
    values = selectMenu.value;
    console.log(values);
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    if (values) {
      fetchGenreBook(values, { signal: controller.signal })
        .then((response) => {
          //console.log("Books fetched successfully:", response);
          showPage("home", response, true);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    } else {
      fetchBook()
        .then((response) => {
          //console.log("Books fetched successfully:", response);
          showPage("home", response, true);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    }
  });

  //Search funtionality-------------------------------------------------------------------------------------
  let search = "";
  let searchedBooks;
  searchBar.addEventListener("input", function () {
    search = searchBar.value;
  });

  newSearchBar.addEventListener("input", function () {
    search = newSearchBar.value;
  });

  searchButton.onclick = function () {
    fetchSearchedBookWithCallback(search, (result) => {
      searchedBooks = result;
      showPage("home", searchedBooks, true);
    });
  };

  newSearchButton.onclick = function () {
    fetchSearchedBookWithCallback(search, (result) => {
      searchedBooks = result;
      showPage("home", searchedBooks, true);
    });
  };
  //Search Functionality ----------------------------------------------------------------------------------------

  toggleButton.onclick = function () {
    navSearch.classList.remove("open_search");
    dropdownMenu.classList.toggle("open");
    const isopen = dropdownMenu.classList.contains("open");
    toggleButtonIcon.classList = isopen
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
    if (isopen) {
      dropdownBookList.classList.add("close");
      allBooksComp.style.marginTop = "1rem";
    }
    if (!isopen) {
      dropdownBookList.classList.remove("close");
      allBooksComp.style.marginTop = "";
    }
  };

  toggleSearchButton.onclick = function () {
    dropdownBookList.classList.remove("close");
    dropdownMenu.classList.remove("open");
    toggleButtonIcon.classList = "fa-solid fa-bars";
    navSearch.classList.toggle("open_search");
    page.classList.remove("extra");
  };

  window.addEventListener("load", handleNavigation);
  window.addEventListener("hashchange", handleNavigation);
}
