import { card } from "./card.js";

const allBookListBody = document.querySelector(".all-book-list");
export function allbookList(response) {
  while (allBookListBody.firstChild) {
    allBookListBody.removeChild(allBookListBody.firstChild);
  }
  const books = response?.results;
  const totalBooks = response?.results?.length;
  for (let i = 0; i < totalBooks; i++) {
    card(books[i], allBookListBody);
  }
}
