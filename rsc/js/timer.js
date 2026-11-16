function updateTimer(time) {
    var seconds = Math.floor(time / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;
    hours %= 12;

    seconds = `${String(seconds).length === 1 ? `0${seconds}` : seconds}`;
    minutes = `${String(minutes).length === 1 ? `0${minutes}` : minutes}`;
    hours = `${String(hours).length === 1 ? `0${hours}` : hours}`;

    timerText.textContent = `${hours}:${minutes}:${seconds}`;
}

const timerId = setInterval(() => {
    if (localStorage.getItem('quizData')) {
        var time = JSON.parse(localStorage.getItem('quizData')).time;
        updateTimer(time);
        
        if (time < 1000) {
            clearInterval(timerId);
            stop();
            timerText.textContent = 'Time up!'
        } else {
            time -= 1000;
            localStorage.setItem('quizData', JSON.stringify({ hasFinished: false, time }));
        }
    } else {
        clearInterval(timerId);
    }
}, 1000);

const timerText = document.querySelector('.timer-text');