let seconds = 0;
let tens = 0;
let mins = 0;

const getSeconds = document.querySelector('.seconds');
const getTens = document.querySelector('.tens');
const getMins = document.querySelector('.mins');

const btnStart = document.querySelector('.btn-start');
const btnStop = document.querySelector('.btn-stop');
const btnReset = document.querySelector('.btn-reset');
const btnLap = document.querySelector('.btn-lap');

let interval;
let lapTimes = [];

// Start Timer
btnStart.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10); // 10 ms interval
});

// Stop Timer
btnStop.addEventListener('click', () => {
    clearInterval(interval);
});

// Reset Timer
btnReset.addEventListener('click', () => {
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    mins = 0;
    getSeconds.innerHTML = '00';
    getTens.innerHTML = '00';
    getMins.innerHTML = '00';
    lapTimes = [];
    updateLapList();
});

// Add Lap
btnLap.addEventListener('click', () => {
    const lapTime = formatTime(mins, seconds, tens);
    lapTimes.push(lapTime);
    updateLapList();
});

// Timer Logic
function startTimer() {
    tens++;
    if (tens > 99) {
        tens = 0;
        seconds++;
        if (seconds > 59) {
            seconds = 0;
            mins++;
        }
    }
    updateDisplay();
}

// Update Timer Display
function updateDisplay() {
    getTens.innerHTML = formatNumber(tens);
    getSeconds.innerHTML = formatNumber(seconds);
    getMins.innerHTML = formatNumber(mins);
}

// Format Time
function formatTime(minutes, seconds, tens) {
    return `${formatNumber(minutes)}:${formatNumber(seconds)}:${formatNumber(tens)}`;
}

// Format Number to 2 Digits
function formatNumber(number) {
    return number < 10 ? `0${number}` : `${number}`;
}

// Update Lap List
function updateLapList() {
    const lapList = document.querySelector('.lap-list');
    lapList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}
