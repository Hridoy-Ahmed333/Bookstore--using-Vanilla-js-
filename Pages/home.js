import { fetchBook } from "../APIs/bookApi.js";
// import { leftColHome } from "../Compnents/leftColHome.js";
let books = {};
function fetchBookWithCallback(callback) {
  fetchBook()
    .then(callback)
    .catch((error) => {
      console.error("Error in homePage:", error);
      callback({ error: "An unknown error occurred" });
    });
}
export function homePage(search, status) {
  if (status) {
    console.log("Searched result in homepage", search);
    return;
  }
  fetchBookWithCallback((result) => {
    books = result;
    console.log("All books in homepage", books);
  });
}
