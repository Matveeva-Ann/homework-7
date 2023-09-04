const td = document.querySelectorAll(".td");
const tbody = document.querySelector(".body");
let delay = 1500;
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="level"]'
);
const result = document.querySelector(".result");

const btnStart = document.querySelector(".btn");
const btnRes = document.querySelector(".btnRes");
let red = 0;
let green = 0;


const levelArr = [
  {
    btnChecked: "easy",
    delay: 1500,
  },
  {
    btnChecked: "medium",
    delay: 1000,
  },
  {
    btnChecked: "heavy",
    delay: 600,
  },
];

function randomArr() {
  let numberCell = [];

  for(let i=0; i < 36; i++){
    numberCell.push(i);
  }
  let sortArr = [];
  for (let i = 0; i < numberCell.length; i++) {
    const random = Math.round(Math.random() * 36);
    sortArr.splice(random, 0, numberCell[i]);
  }
  return sortArr;
}

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", (event) => {
    const selectedValue = event.target.id;
    console.log(selectedValue);
    delay = levelArr.filter((elem) => elem.btnChecked === selectedValue)[0]
      .delay;
  });
});

btnStart.addEventListener("click", function () {
  const sortArr = randomArr();
  for (let i = 0; i < sortArr.length; i++) {
    draw(td[sortArr[i]], delay * i);
  }
});

let count = 0;

function draw(elem, time) {
  setTimeout(() => {
    elem.classList.add("blue");
  }, time);

  setTimeout(() => {
    if (elem.className.includes("blue") && !elem.className.includes("green")) {
      elem.classList.add("red");
      elem.classList.remove("blue");
      red++;
    }
    count++;
    if (count === 36) {
      voicingResult();
    }
  }, time + delay);
}

tbody.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.className.includes("blue")) {
    event.target.classList.add("green");
    green++;
  } 
});

btnRes.addEventListener("click", function () {
  location.reload();
});

function voicingResult() {
  const modalWindow = document.querySelector(".modalWindow");
  const cross = document.querySelector(".cross");
  const scores = document.querySelector('.scores');
  modalWindow.style.display = "flex";
  if (red < green) {
    result.textContent = 'Ви перемогли 😃 ';
    scores.textContent = `Ваша кількість балів: ${green} з 36`;
  } else {
    result.textContent = 'Ви програли 😞 ';
    scores.textContent = `Ваша кількість балів: ${green} з 36`;

  }
  cross.addEventListener("click", () => {
    location.reload();
  });
}
