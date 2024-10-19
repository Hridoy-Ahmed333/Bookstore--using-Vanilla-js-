import { getBook } from "../APIs/bookApi.js";
import { bookDetailContainer } from "../Compnents/bookDetailContainer.js";

const overlay = document.querySelector(".glass-overlay3");
let controller = null;

export function details(data) {
  overlay.classList.remove("close-overlay");

  if (controller) {
    controller.abort();
  }
  controller = new AbortController();

  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => {
    circle.remove();
  });

  getBook(data, { signal: controller.signal })
    .then((res) => {
      if (res) {
        bookDetailContainer(res?.results[0]);
      }
    })
    .catch((err) => {
      overlay.classList.add("close-overlay");
      console.log("Failed to fetch book details:", err);
    });
}
