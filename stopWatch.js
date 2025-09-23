let timer, isRunning = false, startTime, elapsed = 0;

const display = document.getElementById('display'),
      startStopBtn = document.getElementById('startStopBtn'),
      lapBtn = document.getElementById('lapBtn'),
      lapList = document.getElementById('lapList');

const formatTime = ms => [Math.floor(ms/3600000), Math.floor(ms/60000)%60, Math.floor(ms/1000)%60]
                        .map(n => n.toString().padStart(2,'0')).join(':');

const startStop = () => {
    if (isRunning) {
        clearInterval(timer);
        elapsed += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
    } else {
        startTime = Date.now();
        timer = setInterval(() => display.textContent = formatTime(elapsed + Date.now() - startTime), 10);
        startStopBtn.textContent = 'Stop';
        lapBtn.disabled = false;
    }
    isRunning = !isRunning;
};

const reset = () => {
    clearInterval(timer);
    isRunning = false;
    elapsed = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    lapList.innerHTML = '';
};

const recordLap = () => {
    const li = document.createElement('li');
    li.textContent = formatTime(elapsed + (isRunning ? Date.now() - startTime : 0));
    lapList.appendChild(li);
};
