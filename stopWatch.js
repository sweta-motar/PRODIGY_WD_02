let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startStopBtn').textContent = 'Start';
        document.getElementById('lapBtn').disabled = true;
        isRunning = false;
        elapsedTime += Date.now() - startTime;
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        document.getElementById('startStopBtn').textContent = 'Stop';
        document.getElementById('lapBtn').disabled = false;
        isRunning = true;
    }
}

function updateDisplay() {
    const display = document.getElementById('display');
    const formattedTime = formatTime(elapsedTime + Date.now() - startTime);
    display.textContent = formattedTime;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('lapBtn').disabled = true;
    laps = [];
    document.getElementById('lapList').innerHTML = '';
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    return (
        padZero(hours) + ':' +
        padZero(minutes) + ':' +
        padZero(seconds)
    );
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

function recordLap() {
    const lapTime = elapsedTime + Date.now() - startTime;
    laps.push(lapTime);
    const lapList = document.getElementById('lapList');
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapList.appendChild(lapItem);
}
