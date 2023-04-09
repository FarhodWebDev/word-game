//

// DATA
import data from "../json/words.json" assert { type: "json" };

const easy = data.easy;
const medium = data.medium;
const hard = data.hard;

// HTML TAGS
const gameplay = document.getElementById("gameplay");
const description = document.getElementById("description");
const play = document.getElementById("play");
const record = document.querySelector(".score");

// RANDOM COLOR
const values = [
 "0",
 "1",
 "2",
 "3",
 "4",
 "5",
 "6",
 "7",
 "8",
 "9",
 "a",
 "b",
 "c",
 "d",
 "e",
 "f",
];

const descriptions = [
 `<span>Adding score: 1</span>`,
 `<span>Adding score: 2</span>`,
 `<span>Adding score : 3</span>`,
];

const getGradient = () => {
 let color = "#";

 for (let i = 0; i < 6; i++) {
  const randomNumber = Math.trunc(Math.random() * values.length);
  color += values[randomNumber];
 }

 return color;
};

// Random tartiblash funksiyasi
function shuffle(array) {
 let currentIndex = array.length;
 let temporaryValue, randomIndex;

 // Fishtalik tartiblash
 while (0 !== currentIndex) {
  // Qolgan elementlarni tanlash
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  // O'zgaruvchilarni almashtirish
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
 }

 return array;
}
let shuffleData;

const changeMod = (mode) => {
 gameplay.innerHTML = "";
 if (mode == "easy") shuffleData = shuffle(easy);
 else if (mode == "medium") shuffleData = shuffle(medium);
 else if (mode == "hard") shuffleData = shuffle(hard);

 shuffleData.slice(0, 10).map((word) => {
  gameplay.innerHTML += `
  <button class="btn" data-id="${
   word.id
  }" style="background-color:${getGradient()}">${word.eng}</button>
  `;

  gameplay.innerHTML += `
  <button class="btn" data-id="${
   word.id
  }" style="background-color:${getGradient()}">${word.uzb}</button>
  `;
 });
};

let checkerNum = 0;
let score = 0;
let timer = 12;

let firstChecker = 0;
let lastChecker = 0;

window.addEventListener("click", (e) => {
 if (e.target.dataset.id && !firstChecker) {
  checkerNum++;
  firstChecker = e.target;
  //
 } else if (e.target.dataset.id && e.target !== firstChecker && !lastChecker) {
  checkerNum++;
  lastChecker = e.target;
 }
});

window.addEventListener("click", () => {
 if (checkerNum == 2) {
  if (firstChecker.dataset.id == lastChecker.dataset.id) {
   checkerNum = 0;
   firstChecker.remove();
   lastChecker.remove();
   firstChecker = 0;
   lastChecker = 0;
   score++;
  } else {
   firstChecker = 0;
   lastChecker = 0;
   checkerNum = 0;
  }
  record.textContent = score;
  timer = timer + bonus;

  bonusTime.textContent = `+${bonus}`;
  bonusTime.style.opacity = 1;
  setTimeout(() => {
   bonusTime.style.opacity = 0;
  }, 1500);
  inputText.value = "";
 }
});

window.addEventListener("click", (e) => {
 if (e.target.parentElement.dataset.mode == "easy") {
  e.target.parentElement.nextElementSibling.classList.remove("disabled_btn");
  setTimeout(() => {
   e.target.parentElement.classList.add("disabled_btn");
  }, 250);
  description.innerHTML = descriptions[0];
  changeMod("easy");
  //
 } else if (e.target.parentElement.dataset.mode == "medium") {
  e.target.parentElement.nextElementSibling.classList.remove("disabled_btn");
  e.target.parentElement.previousElementSibling.classList.remove(
   "disabled_btn"
  );
  setTimeout(() => {
   e.target.parentElement.classList.add("disabled_btn");
  }, 250);
  description.innerHTML = descriptions[1];
  changeMod("medium");
  //
 } else if (e.target.parentElement.dataset.mode == "hard") {
  e.target.parentElement.previousElementSibling.classList.remove(
   "disabled_btn"
  );

  setTimeout(() => {
   e.target.parentElement.classList.add("disabled_btn");
  }, 250);
  description.innerHTML = descriptions[2];
  changeMod("hard");
 }
});

changeMod("easy");

const time = document.querySelector(".time");
const restart = document.querySelector(".restart");
const modalTitle = document.querySelector(".modtit");

const startTime = () => {
 setInterval(() => {
  timer--;
  if (timer >= 0) {
   time.textContent = `00:${timer < 10 ? "0" + timer : timer}`;
   if (timer == 0) {
    restart.classList.remove("hidden");
    overlay.classList.remove("hidden");
    modalTitle.textContent = score;
   }
  }
 }, 1000);
};

play.addEventListener("click", () => {
 startTime();
 modal.classList.add("hidden");
 overlay.classList.add("hidden");
});

restart.addEventListener("click", () => {
 restart.classList.add("hidden");
 modalTitle.classList.add("hidden");
 // overlay.classList.add("hidden");
 timer = 12;
 score = 0;
 modal.classList.remove("hidden");
});
