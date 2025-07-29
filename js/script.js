const minutesArea = document.querySelector("#minutes");
const secondsArea = document.querySelector("#seconds");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const showIcon = document.querySelector("#show-time");
const hideIcon = document.querySelector("#hide-time");
const hideTimeBar = document.querySelector("#hide-time-bar");
const prevQuestionChevron = document.querySelector("#prev-question");
const nextQuestionChevron = document.querySelector("#next-question");
const questionText = document.querySelector("#question-text");
const timerContainer = document.querySelector("#timer-container");
const timerContent = document.querySelector("#timer-content");
const timerText = document.querySelector("#timer-text");

let interval;
let milisseconds;
let seconds;
let minutes;
let isRunning = false;
let startTime;
let elapsedBeforePaused = 0;

playBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
hideIcon.addEventListener("click", hideTime);
showIcon.addEventListener("click", showTime);

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedBeforePaused;
        interval = setInterval(updateDisplay, 10)
        isRunning = true;
    }
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    resetBtn.style.display = 'block';
    questionText.classList.add("no-hover-effect");
    prevQuestionChevron.classList.add("no-hover-effect");
    nextQuestionChevron.classList.add("no-hover-effect");
};

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
};

function pauseTimer() {
    if (isRunning) {
        clearInterval(interval);
        elapsedBeforePaused = Date.now() - startTime;
        isRunning = false;
    }
    pauseBtn.style.display = 'none';
    resetBtn.style.display = 'block';
    playBtn.style.display = 'block';
    questionText.classList.remove("no-hover-effect");
    prevQuestionChevron.classList.remove("no-hover-effect");
    nextQuestionChevron.classList.remove("no-hover-effect");
};

function resetTimer() {
    minutesArea.textContent = "00";
    secondsArea.textContent = "00";
    startTime = Date.now();
    elapsedBeforePaused = 0;
    resetBtn.style.display = 'none';
    pauseTimer();
    updateDisplay()
};

function updateDisplay() {
    if (startTime === 0) {
        minutesArea.textContent = "00";
        secondsArea.textContent = "00";
        return
    }
    let elapsedTime = Date.now() - startTime;
    minutes = Math.floor(elapsedTime / (1000 * 60));
    elapsedTime %= (1000 * 60);
    seconds = Math.floor(elapsedTime / 1000);
    milisseconds = elapsedTime % 1000;
    minutesArea.textContent = formatTime(minutes);
    secondsArea.textContent = formatTime(seconds);
};

function hideTime() {
    timerText.style.display = 'none'
    hideTimeBar.style.display = 'flex'
    hideIcon.style.display = 'none'
    showIcon.style.display = 'block'
};

function showTime() {
    timerText.style.display = 'flex'
    hideTimeBar.style.display = 'none'
    showIcon.style.display = 'none'
    hideIcon.style.display = 'block'
};

document.addEventListener("keydown", (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        if (playBtn.style.display != 'none') {
            startTimer();
        } else {
            pauseTimer()
        }
    } else if (event.code === 'KeyR') {
        resetTimer();
    } else if (event.code === 'KeyH') {
        if (timerText.style.display != 'none') {
            hideTime();
        } else {
            showTime();
        }
    }
});