/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

document.addEventListener("DOMContentLoaded", function() {
  const values = [
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
    "K",
    "A"
  ];
  const suits = [
    { name: "Corazones", icon: "bi-suit-heart-fill", color: "red" },
    { name: "Picas", icon: "bi-suit-spade-fill", color: "black" },
    { name: "Tréboles", icon: "bi-suit-club-fill", color: "black" },
    { name: "Diamantes", icon: "bi-suit-diamond-fill", color: "red" }
  ];

  let originalCards = [];
  let logOfChanges = [];

  function generateRandomCard() {
    const randomValue = values[Math.floor(Math.random() * values.length)];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    return { value: randomValue, suit: randomSuit };
  }

  function drawCards() {
    const numCards = parseInt(document.getElementById("numCards").value);
    if (isNaN(numCards) || numCards <= 0) return;

    originalCards = [];
    let cardsHtml = "";

    for (let i = 0; i < numCards; i++) {
      const card = generateRandomCard();
      originalCards.push(card);
      cardsHtml += createCardHtml(card);
    }

    document.getElementById("cardsContainer").innerHTML = cardsHtml;
    document.getElementById("changesLog").innerHTML = "";
    logOfChanges = [];
  }

  function createCardHtml(card) {
    return `
      <div class="card">
        <div class="top-left-icon ${card.suit.color}"><i class="bi ${card.suit.icon}"></i></div>
        <div class="card-value">${card.value}</div>
        <div class="bottom-right-icon ${card.suit.color}"><i class="bi ${card.suit.icon}"></i></div>
      </div>
    `;
  }

  function sortCards() {
    let cards = [...originalCards];
    logOfChanges.push([...cards]);

    let wall = cards.length - 1;
    while (wall > 0) {
      let index = 0;
      while (index < wall) {
        if (getCardValue(cards[index]) > getCardValue(cards[index + 1])) {
          [cards[index], cards[index + 1]] = [cards[index + 1], cards[index]];

          logOfChanges.push([...cards]);

          renderSortedCards(cards);
        }
        index++;
      }
      wall--;
    }

    renderSortedCards(cards);
    renderLogOfChanges();
  }

  function getCardValue(card) {
    return values.indexOf(card.value);
  }

  function renderSortedCards(cards) {
    let cardsHtml = "";
    cards.forEach(card => {
      cardsHtml += createCardHtml(card);
    });
    document.getElementById("cardsContainer").innerHTML = cardsHtml;
  }

  function renderLogOfChanges() {
    let logHtml = "";
    logOfChanges.forEach((cardsSet, index) => {
      logHtml += `<div class="log-step">`;
      logHtml += `<div class="log-index"> ${index}:</div>`;
      cardsSet.forEach(card => {
        logHtml += createCardHtml(card);
      });
      logHtml += `</div>`;
    });
    document.getElementById("changesLog").innerHTML = logHtml;
  }

  document.querySelector("button#drawCardsBtn").onclick = drawCards;
  document.querySelector("button#sortCardsBtn").onclick = sortCards;
});
