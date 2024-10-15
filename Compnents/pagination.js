import { getPages } from "../APIs/bookApi.js";
import { allbookList } from "./allbookList.js";

const paginationContainer = document.querySelector(".pagination");
const overlay = document.querySelector(".glass-overlay");
const allBookListBody = document.querySelector(".all-book-list");
let prevType;
let hasInitialPageLoaded = false;
let controller = null;
export function pagination(books, type, query) {
  const totalProducts = books?.count;
  const productsPerPage = 32;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  function getVisiblePages(currentPage) {
    const visiblePages = [];
    const range = 2;

    visiblePages.push(1);

    if (currentPage - range > 2) {
      visiblePages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      visiblePages.push(i);
    }

    if (currentPage + range < totalPages - 1) {
      visiblePages.push("...");
    }

    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }

    return visiblePages;
  }

  function renderPagination(currentPage) {
    paginationContainer.innerHTML = "";

    const visiblePages = getVisiblePages(currentPage);

    visiblePages.forEach((page) => {
      const li = document.createElement("li");
      li.textContent = page;

      li.onclick = () => {
        if (page !== "...") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          nextPage(page, type, query); // Fetch new data for the clicked page
          renderPagination(page);
        }
      };
      if (page === currentPage) {
        li.classList.add("active");
      }

      paginationContainer.appendChild(li);
    });
  }
  if (!hasInitialPageLoaded) {
    console.log("page reseting");
    allbookList(books);
    hasInitialPageLoaded = true;
    renderPagination(1);
  } else {
    // if (type !== prevType) {
    if (type) {
      allbookList(books);
      renderPagination(1);
      if (type !== prevType) {
        hasInitialPageLoaded = false;
        prevType = type;
      }
    } else {
      renderPagination(1);
    }
  }
}

function nextPage(page, type, query) {
  if (!type) {
    const address = `https://gutendex.com/books/?page=${page}`;
    apiCall(address);
  }
  if (type === "all") {
    const address = `https://gutendex.com/books/?page=${page}`;
    apiCall(address);
  }
  if (type === "topic") {
    const address = `https://gutendex.com/books/?page=${page}&topic=${query}`;
    apiCall(address);
  }
  if (type === "search") {
    const address = `https://gutendex.com/books/?page=${page}&search=+${query}`;
    apiCall(address);
  }
}

function apiCall(address) {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  let signal = { signal: controller.signal };
  while (allBookListBody.firstChild) {
    allBookListBody.removeChild(allBookListBody.firstChild);
  }
  overlay.classList.remove("close-overlay");
  getPages(address, signal).then((response) => {
    overlay.classList.add("close-overlay");
    allbookList(response);
  });
}
