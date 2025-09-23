let timer, isRunning = false, startTime, elapsed = 0;

const display = document.getElementById('display'), //Where the timer (HH:MM:SS) is shown.
      startStopBtn = document.getElementById('startStopBtn'),
      lapBtn = document.getElementById('lapBtn'),
      lapList = document.getElementById('lapList');
//Converts milliseconds to HH:MM:SS format:hrs,min,sec 
//.map(n => n.toString().padStart(2,'0')) → Ensures two digits (e.g., 05).
const formatTime = ms => [Math.floor(ms/3600000), Math.floor(ms/60000)%60, Math.floor(ms/1000)%60]
                        .map(n => n.toString().padStart(2,'0')).join(':');

const startStop = () => {
    if (isRunning) {
        clearInterval(timer);//Stops updating the display.
        elapsed += Date.now() - startTime; //Adds the time passed since last start to elapsed
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;//disable
    } else {
        startTime = Date.now();
        timer = setInterval(() => display.textContent = formatTime(elapsed + Date.now() - startTime), 10);//Update the display every 10 milliseconds using an arrow function.
        startStopBtn.textContent = 'Stop';
        lapBtn.disabled = false;//enable
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
    lapList.innerHTML = '';//Clears all lap times from the list.
};

const recordLap = () => {
    const li = document.createElement('li');
    li.textContent = formatTime(elapsed + (isRunning ? Date.now() - startTime : 0));//Calculates current elapsed time:
    lapList.appendChild(li);
};

