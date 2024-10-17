import { getBook } from "../APIs/bookApi.js";
import { bookDetailContainer } from "../Compnents/bookDetailContainer.js";

export function details(data) {
  getBook(data).then((res) => bookDetailContainer(data));
}
