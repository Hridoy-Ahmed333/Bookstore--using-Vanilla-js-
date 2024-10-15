export async function fetchBook(signal) {
  try {
    const response = await fetch("https://gutendex.com/books/", signal);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message1 !== "signal is aborted without reason") {
      console.log(error);
    }
    return error.message;
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

export async function getPages(search, signal) {
  try {
    const response = await fetch(search, signal);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message1 !== "signal is aborted without reason") {
      console.log(error);
    }
    return error.message;
  }
}
