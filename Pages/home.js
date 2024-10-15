import { fetchBook } from "../APIs/bookApi.js";
import { pagination } from "../Compnents/pagination.js";

let books = {};
// function fetchBookWithCallback(callback) {
//   fetchBook()
//     .then(callback)
//     .catch((error) => {
//       console.error("Error in homePage:", error);
//       callback({ error: "An unknown error occurred" });
//     });
// }
export function homePage(search, status, type, query) {
  if (status) {
    //console.log("Searched result in homepage", type, status, search);
    pagination(search, type, query);
    return;
  }
  // fetchBookWithCallback((result) => {
  //   books = result;
  //   pagination(books, type, query);
  // });
  fetchBook()
    .then((books) => {
      pagination(books, type, query);
    })
    .catch((error) => {
      console.error("Error in homePage:", error);
      callback({ error: "An unknown error occurred" });
    });
}
