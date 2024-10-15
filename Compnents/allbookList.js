const allBookListBody = document.querySelector(".all-book-list");
export function allbookList(response) {
  while (allBookListBody.firstChild) {
    allBookListBody.removeChild(allBookListBody.firstChild);
  }
  console.log(response);
  const books = response?.results;
  const totalBooks = response?.results?.length;
  for (let i = 0; i < totalBooks; i++) {
    const newDiv = document.createElement("div");
    newDiv.textContent = `${books[i].id}:${books[i].title}`;
    newDiv.className = "card-div";
    allBookListBody.appendChild(newDiv);
  }
}
