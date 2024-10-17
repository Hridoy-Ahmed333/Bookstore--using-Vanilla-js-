export function card(data, parentelement) {
  const card = document.createElement("div");
  const imgBx = document.createElement("div");
  const img = document.createElement("img");
  const nameDiv = document.createElement("div");
  const cardContent = document.createElement("div");
  const author = document.createElement("div");
  const link = document.createElement("a");
  const bookid = document.createElement("div");
  const buttonBlock = document.createElement("div");
  const wishlist = document.createElement("div");
  const card2 = document.createElement("div");
  const imgBx2 = document.createElement("div");
  const img2 = document.createElement("img");
  const info = document.createElement("div");
  const nameDiv2 = document.createElement("div");
  const bookid2 = document.createElement("div");
  const author2 = document.createElement("div");
  const buttonBlock2 = document.createElement("div");
  const link2 = document.createElement("a");
  const wishlist2 = document.createElement("div");

  const authorName =
    data.authors.length > 0
      ? data.authors[0].name
      : "Author name does not founded";
  function tilettring(str) {
    if (str.length > 30) {
      return str.substring(0, 30) + "...";
    }
    return str;
  }

  let books = JSON.parse(localStorage.getItem("bookArray"));
  const bookIndex = books?.findIndex((item) => item === data.id);
  if (books) {
    if (bookIndex !== -1) {
      wishlist.innerHTML = `Wishlist:
      ${`<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="50" height="30" stroke-width="1.5" stroke="red" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>`}
    `;
      wishlist2.innerHTML = `Wishlist:${" "}${`<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="2.5 4.5 19 16" width="20" height="20" stroke-width="1.5" stroke="red" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>`}
  `;
    } else {
      wishlist.innerHTML = `Wishlist:
  ${`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="50" height="30" stroke-width="1.5" stroke="red" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`}
  `;
      wishlist2.innerHTML = `Wishlist:${" "}${`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="2.5 4.5 19 16" width="20" height="20" stroke-width="1.5" stroke="red" class="size-6">
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
    wishlist2.innerHTML = `Wishlist:${" "}${`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="2.5 4.5 19 16" width="20" height="20" stroke-width="1.5" stroke="red" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`}
  `;
  }

  const imageUrl = data.formats["image/jpeg"];
  const title = tilettring(data.title);
  img.src = imageUrl || "../images/book-cover.png";
  img.alt = title;
  nameDiv.textContent = title;
  author.textContent = authorName;
  link.textContent = `Details`;
  bookid.textContent = `Id: ${data.id}`;

  img2.src = imageUrl || "../images/book-cover.png";
  img2.alt = title;
  nameDiv2.textContent = title;
  author2.textContent = authorName;
  link2.textContent = `Details`;
  bookid2.textContent = `Id: ${data.id}`;

  // Adding data-id to the card div
  card.setAttribute("data-id", data.id);
  link.setAttribute("data-id", data.id);
  imgBx.setAttribute("data-id", data.id);
  img.setAttribute("data-id", data.id);
  nameDiv.setAttribute("data-id", data.id);
  cardContent.setAttribute("data-id", data.id);
  author.setAttribute("data-id", data.id);
  bookid.setAttribute("data-id", data.id);
  buttonBlock.setAttribute("data-id", data.id);

  // Similarly for card2
  card2.setAttribute("data-id", data.id);
  link2.setAttribute("data-id", data.id);
  imgBx2.setAttribute("data-id", data.id);
  img2.setAttribute("data-id", data.id);
  nameDiv2.setAttribute("data-id", data.id);
  info.setAttribute("data-id", data.id);
  author2.setAttribute("data-id", data.id);
  bookid2.setAttribute("data-id", data.id);
  buttonBlock2.setAttribute("data-id", data.id);

  //Class adding
  card.classList.add("card");
  imgBx.classList.add("imgBx");
  img.classList.add("card-img");
  nameDiv.classList.add("name-div");
  cardContent.classList.add("card-content");
  author.classList.add("author");
  link.classList.add("link");
  bookid.classList.add("book-id");
  buttonBlock.classList.add("button-block");
  wishlist.classList.add("wish-list-button");
  card2.classList.add("card2");
  imgBx2.classList.add("imgBx2");
  img2.classList.add("img2");
  info.classList.add("info");
  nameDiv2.classList.add("nameDiv2");
  bookid2.classList.add("bookid2");
  author2.classList.add("author2");
  buttonBlock2.classList.add("buttonBlock2");
  link2.classList.add("link2");
  wishlist2.classList.add("wishlist2");
  //Appending section
  imgBx.appendChild(img);
  imgBx.appendChild(nameDiv);
  card.appendChild(imgBx);
  cardContent.appendChild(bookid);
  cardContent.appendChild(author);
  buttonBlock.appendChild(link);
  buttonBlock.appendChild(wishlist);
  cardContent.appendChild(buttonBlock);
  card.appendChild(cardContent);
  parentelement.appendChild(card);
  imgBx2.appendChild(img2);
  card2.appendChild(imgBx2);
  info.appendChild(nameDiv2);
  info.appendChild(bookid2);
  info.appendChild(author2);
  card2.appendChild(info);
  buttonBlock2.appendChild(link2);
  buttonBlock2.appendChild(wishlist2);
  card2.appendChild(buttonBlock2);
  parentelement.appendChild(card2);

  wishlist.addEventListener("click", (event) => {
    event.stopPropagation();
    wishListController(data);
  });
  wishlist2.addEventListener("click", (event) => {
    event.stopPropagation();
    wishListController(data);
  });
  card.addEventListener("click", (event) => {
    console.log("You have clicked the card");
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
      wishlist2.innerHTML = `Wishlist:${" "}${`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="2.5 4.5 19 16" width="20" height="20" stroke-width="1.5" stroke="red" class="size-6">
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
      wishlist2.innerHTML = `Wishlist:${" "}${`<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="2.5 4.5 19 16" width="20" height="20" stroke-width="1.5" stroke="red" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>`}
  `;
    }
    localStorage.setItem("bookArray", JSON.stringify(bookArray));
  }
  card.addEventListener("click", function (event) {
    const bookId = event.target.getAttribute("data-id");
    window.location.hash = `details/${bookId}`;
  });
}
