import { fetchBook, fetchGenreBook, fetchSearchBook } from "./APIs/bookApi.js";
import { details } from "./Pages/detail.js";

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
const overlay = document.querySelector(".glass-overlay");
const allBookListBody = document.querySelector(".all-book-list");
const searchContainer = document.querySelector(".search-container");
const allBookList = document.querySelector(".all_books");

// export function showPage(pageId, search, status, type, query) {
//   const pages = document.querySelectorAll(".page");
//   pages.forEach((page) => page.classList.remove("active"));

//   const activePage = document.getElementById(pageId);
//   if (activePage) {
//     activePage.classList.add("active");
//   }

//   if (pageId.startsWith("details/")) {
//     const id = pageId.split("/")[1];
//     navSearch.classList.add("remove-nav");
//     searchContainer.classList.add("remove-nav");
//     toggleSearchButton.classList.add("remove-nav");
//     details(id);
//   } else {
//     loadPageScript(pageId, search, status, type, query);
//   }
// }

export function showPage(pageId, search, status, type, query) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("active"));

  let activePage;

  if (pageId.startsWith("details/")) {
    activePage = document.getElementById("details");
    if (activePage) {
      activePage.classList.add("active");
    }

    const id = pageId.split("/")[1];
    navSearch.classList.add("remove-nav");
    searchContainer.classList.add("remove-nav");
    toggleSearchButton.classList.add("remove-nav");

    details(id);
  } else {
    activePage = document.getElementById(pageId);
    if (activePage) {
      activePage.classList.add("active");
    }

    loadPageScript(pageId, search, status, type, query);
  }
}

function loadPageScript(pageId, search, status, type, query) {
  switch (pageId) {
    case "home":
      navSearch.classList.remove("remove-nav");
      searchContainer.classList.remove("remove-nav");
      toggleSearchButton.classList.remove("remove-nav");
      import("./Pages/home.js")
        .then((module) => module.homePage(search, status, type, query, pageId))
        .catch((error) =>
          console.error("Failed to load home page script:", error)
        );
      break;
    case "wishlist":
      overlay.classList.remove("close-overlay");
      navSearch.classList.add("remove-nav");
      searchContainer.classList.add("remove-nav");
      toggleSearchButton.classList.add("remove-nav");

      import("./Pages/wishlist.js")
        .then((module) => module.wishlistPage(pageId))
        .catch((error) =>
          console.error("Failed to load about page script:", error)
        );
      break;
    case "contact":
      overlay.classList.remove("close-overlay");
      navSearch.classList.add("remove-nav");
      searchContainer.classList.add("remove-nav");
      toggleSearchButton.classList.add("remove-nav");
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
  document.querySelectorAll(".nav_links").forEach((link) => {
    const linkHash = link.getAttribute("href").substring(1);

    if (linkHash === currentHash) {
      link.classList.add("active-nav-link");
    } else {
      link.classList.remove("active-nav-link");
    }
  });
  showPage(currentHash, false, false, "all");
}

let controller = null;

function fetchSearchedBookWithCallback(search, callback) {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  while (allBookListBody.firstChild) {
    allBookListBody.removeChild(allBookListBody.firstChild);
  }
  overlay.classList.remove("close-overlay");

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
      showPage(pageId, search, false, "all");
    });
  });
  //--------------------------------------------------------------------------------------------------
  const selectMenu = document.querySelector(".book_dropdown_menu");
  let values = selectMenu.value;
  selectMenu.addEventListener("change", function () {
    values = selectMenu.value;
    let allcircles = document.querySelectorAll(".circle");
    allcircles.forEach((circle) => {
      circle.remove();
    });
    console.log(values);

    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    if (values) {
      while (allBookListBody.firstChild) {
        allBookListBody.removeChild(allBookListBody.firstChild);
      }
      overlay.classList.remove("close-overlay");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      allBookList.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      fetchGenreBook(values, { signal: controller.signal })
        .then((response) => {
          overlay.classList.add("close-overlay");
          //console.log("Books fetched successfully:", response);
          showPage("home", response, true, "topic", values);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    } else {
      while (allBookListBody.firstChild) {
        allBookListBody.removeChild(allBookListBody.firstChild);
      }
      overlay.classList.remove("close-overlay");
      fetchBook()
        .then((response) => {
          overlay.classList.add("close-overlay");

          showPage("home", response, true, "all");
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
    dropdownBookList.selectedIndex = 0;
    let circles = document.querySelectorAll(".circle");
    circles.forEach((circle) => {
      circle.remove();
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    allBookList.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    fetchSearchedBookWithCallback(searchBar.value, (result) => {
      searchedBooks = result;
      overlay.classList.add("close-overlay");
      showPage("home", searchedBooks, true, "search", search);
      searchBar.value = "";
    });
  };

  newSearchButton.onclick = function () {
    dropdownBookList.selectedIndex = 0;
    let allcircles = document.querySelectorAll(".circle");
    allcircles.forEach((circle) => {
      circle.remove();
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    allBookList.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    fetchSearchedBookWithCallback(newSearchBar.value, (result) => {
      searchedBooks = result;
      overlay.classList.add("close-overlay");
      showPage("home", searchedBooks, true, "search", search);
      newSearchBar.value = "";
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
