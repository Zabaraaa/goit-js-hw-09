import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.getElementById('datetime-picker');

const btnStart = document.querySelector('button[data-start]');

const dayEl = document.querySelector('span[data-days]');
const hourEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondEl = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

let ms = null;
let selectedDate = null;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {

    selectedDate = selectedDates[0];
    ms = selectedDate - options.defaultDate;
    
    if (ms < 0) {
      window.alert("Please choose a date in the future");
    } else {
      btnStart.disabled = false;
    }
    return
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', onStart)

function onStart(e) {
  intervalId = setInterval(convertMs, 1000)
}

function convertMs(ms) {
  ms = selectedDate - Date.now();
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  dayEl.textContent = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  hourEl.textContent = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  minutesEl.textContent = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  secondEl.textContent = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

if (ms < 1000) {
    input.disabled = false;
    Notify.success('Time is up!');
    clearInterval(intervalId);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}