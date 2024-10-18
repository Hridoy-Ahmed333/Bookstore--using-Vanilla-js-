const allBooks = document.querySelector(".all_books");
const circleClass = document.querySelector(".circle");

export function circle() {
  const top = [
    "5%",
    "2%",
    "20%",
    "13%",
    "30%",
    "42%",
    "80%",
    "53%",
    "77%",
    "58%",
    "64%",
    "70%",
  ];
  const left = [
    "60%",
    "20%",
    "-20%",
    "30%",
    "70%",
    "10%",
    "60%",
    "70%",
    "20%",
    "10%",
    "70%",
    "10%",
  ];
  const width = [
    "50%",
    "20%",
    "60%",
    "25%",
    "40%",
    "40%",
    "50%",
    "20%",
    "30%",
    "25%",
    "40%",
    "20%",
  ];
  const direction = [
    "right",
    "right",
    "bottom",
    "right",
    "top",
    "bottom",
    "right",
    "right",
    "bottom",
    "right",
    "top",
    "bottom",
  ];
  const color1 = [
    "red",
    "#FF0149",
    "#15DCC1",
    "#013F77",
    "#2A3F00",
    "#2A00FF",
    "orange",
    "#B000A1",
    "green",
    "#00A4FF",
    "orange",
    "#8B00B9",
  ];
  const color2 = [
    "yellow",
    "#B000A1",
    "#8B00B9",
    "#00A4FF",
    "#BDEFfC",
    "#8B00B9",
    "red",
    "#FF0149",
    "#15DCC1",
    "#013F77",
    "#2AFF00",
    "#2A00FF",
  ];

  for (let i = 0; i < top.length; i++) {
    const circle = document.createElement("div");

    circle.style.position = "absolute";
    circle.style.top = top[i];
    circle.style.left = left[i];
    circle.style.width = width[i];
    circle.style.paddingTop = width[i];

    circle.style.background = `linear-gradient(to ${direction[i]}, ${color1[i]}, ${color2[i]})`;
    circle.style.borderRadius = "50%";
    circle.classList.add("circle");
    allBooks.appendChild(circle);
  }
}
