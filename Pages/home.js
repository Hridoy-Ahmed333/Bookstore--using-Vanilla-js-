import { fetchBook } from "../APIs/bookApi.js";
import { pagination } from "../Compnents/pagination.js";

const overlay = document.querySelector(".glass-overlay");
const allBookListBody = document.querySelector(".all-book-list");
const btn = document.querySelector(".get-started");
const allBookList = document.querySelector(".all_books");

let books = {};
let controller = null;
let shouldCall = false;
export function homePage(search, status, type, query, id) {
  btn.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    allBookList.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (status) {
    pagination(search, type, query);
    return;
  }
  while (allBookListBody.firstChild) {
    allBookListBody.removeChild(allBookListBody.firstChild);
  }
  overlay.classList.remove("close-overlay");
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => {
    circle.remove();
  });
  fetchBook({ signal: controller.signal })
    .then((books) => {
      if (books === "signal is aborted without reason") {
        return;
      }
      overlay.classList.add("close-overlay");
      pagination(books, type, query);
    })
    .catch((error) => {
      console.error("Error in homePage:", error);
      callback({ error: "An unknown error occurred" });
    });
}
