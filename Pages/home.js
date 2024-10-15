import { fetchBook } from "../APIs/bookApi.js";
import { pagination } from "../Compnents/pagination.js";

const overlay = document.querySelector(".glass-overlay");
const allBookListBody = document.querySelector(".all-book-list");

let books = {};
let controller = null;
let shouldCall = false;
export function homePage(search, status, type, query, id) {
  console.log("Home page is called");

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
