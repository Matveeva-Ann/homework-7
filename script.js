const td = document.querySelectorAll(".td");
const tbody = document.querySelector(".body");
const computer = document.querySelector('.computer');
const user = document.querySelector('.user');
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
    delay: 500,
  },
  {
    btnChecked: 'hardcore',
    delay:400,
  }
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
    delay = levelArr.filter((elem) =>  elem.btnChecked === selectedValue)[0].delay;});
});

btnStart.addEventListener("click", function () {
  const sortArr = randomArr();
  const levels = document.querySelectorAll('.inputs__item');
  for (let i = 0; i < sortArr.length; i++) {
    draw(td[sortArr[i]], delay * i);
  }
  btnStart.setAttribute("disabled", "disabled");
  levels.forEach(elem =>{
    elem.setAttribute("disabled", "disabled");
  })
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
      computer.textContent = red;
    }
    count++;
    if (count === 36) {
      voicingResult();
    }
  }, time + delay);
}

tbody.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.className.includes("blue") && !event.target.className.includes("green")) {
    event.target.classList.add("green");
    green++;
    user.textContent = green;
  } 
});

btnRes.addEventListener("click", function () {
  location.reload();
});

function voicingResult() {
  const modalWindow = document.querySelector(".modalWindow");
  const cross = document.querySelector(".cross");
  modalWindow.style.display = "flex";
  if (red < green) {
    result.textContent = 'Ви перемогли 😃 ';
  } else if (red > green) {
    result.textContent = 'Ви програли 😞 ';
  } else{
    result.textContent = `Нічия (◕‿◕) `;
  }
  cross.addEventListener("click", () => {
    location.reload();
  });
}
