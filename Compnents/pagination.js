import { getPages } from "../APIs/bookApi.js";
import { allbookList } from "./allbookList.js";

const paginationContainer = document.querySelector(".pagination");
let prevType;
let hasInitialPageLoaded = false;
export function pagination(books, type, query) {
  const totalProducts = books?.count;
  const productsPerPage = 32;
  //   console.log(totalProducts);
  //   console.log(books.results.length);
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
    allbookList(books);
    hasInitialPageLoaded = true;
    renderPagination(1);
  } else {
    if (type !== prevType) {
      allbookList(books);
      hasInitialPageLoaded = false;
      renderPagination(1);
      prevType = type;
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
  getPages(address).then((response) => {
    allbookList(response);
  });
}
