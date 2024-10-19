import { getBook } from "../APIs/bookApi.js";
import { bookDetailContainer } from "../Compnents/bookDetailContainer.js";

const overlay = document.querySelector(".glass-overlay3");
const detailOv = document.querySelector(".detail-overlay");
let controller = null;

export function details(data) {
  // overlay.classList.remove("close-overlay");
  console.log(console.log(overlay));

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
        overlay.classList.add("close-overlay");
      }
    })
    .catch((err) => {
      console.log("Failed to fetch book details:", err);
    });
}
