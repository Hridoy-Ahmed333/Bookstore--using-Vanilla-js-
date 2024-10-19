const title = document.querySelector(".book-detail-title");
const id = document.querySelector(".id-detail-page");
const authorName = document.querySelector(".author-name-detail");
const lifeSpan = document.querySelector(".life-span");
const language = document.querySelector(".language");
const download = document.querySelector(".download");
const genreClass = document.querySelector(".all-genre");
const wishlist = document.querySelector(".btn-wishlist-detail");
const imageBox = document.querySelector(".detail-pic-container");
const overlay = document.querySelector(".glass-overlay3");
function genre(arr) {
  if (arr.length > 0) {
    return arr.join(", ");
  } else {
    return "No Genre Found";
  }
}
export function bookDetailContainer(data) {
  let books = JSON.parse(localStorage.getItem("bookArray"));
  const bookIndex = books?.findIndex((item) => item === data.id);
  if (books) {
    if (bookIndex !== -1) {
      wishlist.innerHTML = `Wishlist:
      ${`<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="50" height="30" stroke-width="1.5" stroke="red" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>`}
    `;
    } else {
      wishlist.innerHTML = `Wishlist:
  ${`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="50" height="30" stroke-width="1.5" stroke="red" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`}
  `;
    }
  } else {
    wishlist.innerHTML = `Wishlist:
  ${`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="50" height="30" stroke-width="1.5" stroke="red" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`}
  `;
  }

  const author = data?.authors[0]?.name || "Author not found";
  const authorLifeStart = data?.authors[0]?.birth_year || "Unknown";
  const authorLifeEnd = data?.authors[0]?.death_year || "Unknown";
  const BookLanguage = data?.languages[0] === "en" ? "English" : "Unknown";
  const bookGenre = genre(data?.subjects);
  title.textContent = data?.title || "Title not found";
  id.textContent = `ID: ${data?.id} ` || "ID not found";
  authorName.textContent = author;
  lifeSpan.textContent = `${authorLifeStart} to ${authorLifeEnd}`;
  language.textContent = BookLanguage;
  download.textContent = data?.download_count || "No Download Found";
  genreClass.textContent = bookGenre;
  const imageUrl = data.formats["image/jpeg"];
  console.log(imageUrl);
  imageBox.style.backgroundImage = `url(${
    imageUrl || "../images/book-cover.png"
  })`;

  wishlist.addEventListener("click", (event) => {
    event.stopPropagation();
    wishListController(data);
  });
  function wishListController(data) {
    let bookArray = JSON.parse(localStorage.getItem("bookArray")) || [];
    const itemIndex = bookArray.findIndex((item) => item === data.id);

    if (itemIndex !== -1) {
      bookArray.splice(itemIndex, 1);
      wishlist.innerHTML = `Wishlist:
      ${`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="50" height="30" stroke-width="1.5" stroke="red" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>`}
      `;
    } else {
      bookArray.push(data.id);
      wishlist.innerHTML = `Wishlist:
      ${`<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="50" height="30" stroke-width="1.5" stroke="red" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>`}
    `;
    }
    localStorage.setItem("bookArray", JSON.stringify(bookArray));
  }
  overlay.classList.add("close-overlay");
}
