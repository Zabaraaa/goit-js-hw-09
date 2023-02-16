const btnStart = document.querySelector('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')
const body = document.querySelector('body')

btnStop.disabled = true;
let intervalId = null;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);


function onStart(e) {
  intervalId = setInterval(changeColor, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function onStop(e) {
  clearInterval(intervalId);
  btnStop.disabled = true;
  btnStart.disabled = false;
}


function changeColor() {
    body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
