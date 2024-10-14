export async function fetchBook() {
  try {
    const response = await fetch("https://gutendex.com/books/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function fetchSearchBook(search, signal) {
  try {
    const response = await fetch(
      `https://gutendex.com/books/?search=%20${search}`,
      signal
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function fetchGenreBook(search, signal) {
  try {
    const response = await fetch(
      `https://gutendex.com/books?topic=${search}`,
      signal
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
