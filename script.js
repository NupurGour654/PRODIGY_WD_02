let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

function updateTime() {
    const currentTime = Date.now();
    const time = new Date(elapsedTime + (currentTime - startTime));
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const milliseconds = String(time.getMilliseconds()).padStart(3, '0').slice(0, 2);
    timeDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
    startTime = Date.now();
    timer = setInterval(updateTime, 10);
    startStopBtn.textContent = 'Pause';
    isRunning = true;
}

function pause() {
    elapsedTime += Date.now() - startTime;
    clearInterval(timer);
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function startStop() {
    if (isRunning) {
        pause();
    } else {
        start();
    }
}

function lap() {
    if (isRunning) {
        const lapTime = timeDisplay.textContent;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;  // Ensure elapsedTime is reset to 0
    timeDisplay.textContent = '00:00:00';  // Initialize the time display to 0
    startStopBtn.textContent = 'Start';
    laps = [];
    lapsList.innerHTML = '';
}

// Event Listeners
startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
