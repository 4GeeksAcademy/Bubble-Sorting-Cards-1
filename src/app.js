/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

// Corazones, Picas, Tréboles y Diamantes.
// corazones y diamantes =>color rojo
//trebol y espadas=> color negro

let card = ["♥", "♠", "♣", "♦"];

let valueCard = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

function randomNum(arr) {
  let random = Math.floor(Math.random() * arr.length);
  return arr[random];
}

//Probando en consola
console.log(randomNum(card));
console.log(randomNum(valueCard));

function generatorCard() {
  let palo = randomNum(card);
  let valor = randomNum(valueCard);

  let colorCard;
  if (palo === "♥" || palo === "♦") {
    colorCard = "red";
  } else {
    colorCard = "black";
  }

  document.getElementById("card").innerHTML = `
    <div class="symbol top-left ${colorCard}">${palo}</div>
    <div class="value">${valor}</div>
    <div class="symbol bottom-right ${colorCard}">${palo}</div>
  `;
}

window.onload = function() {
  generatorCard();
  document.getElementById("newCard").addEventListener("click", generatorCard);
  setInterval(generatorCard, 10000);
};