import { getWishlist } from "../APIs/bookApi.js";
import { card } from "../Compnents/card.js";
const allBookListBody = document.querySelector(".book_list_wishlist");
const overlay = document.querySelector(".glass-overlay2");
const heading = document.querySelector(".wishlist-heading");
let controller = null;

export function wishlistPage(pageId) {
  // Clear any existing book list content
  while (allBookListBody.firstChild) {
    allBookListBody.removeChild(allBookListBody.firstChild);
  }

  console.log(pageId);

  if (controller) {
    controller.abort();
  }

  overlay.classList.remove("glass-overlay2-remove");
  controller = new AbortController();

  // Fetch wishlist data
  getWishlist({ signal: controller.signal })
    .then((response) => {
      if (response === "signal is aborted without reason") {
        return;
      }
      if (response) {
      }

      if (response === false) {
        overlay.classList.add("glass-overlay2-remove");
        heading.textContent = "You dont have any book in the wishlist";
        return;
      }

      const books = response?.results;
      const totalBooks = response?.results?.length;
      let numColumns = Math.ceil(totalBooks / 4);
      allBookListBody.style.gridTemplateRows = `repeat(${numColumns}, auto)`;

      // Render the book cards
      for (let i = 0; i < totalBooks; i++) {
        card(books[i], allBookListBody);
      }

      overlay.classList.add("glass-overlay2-remove");
    })
    .catch((error) => {
      console.error("Error in wishlistPage:", error);
    });
}
