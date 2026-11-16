function start() {
    const quizData = JSON.parse(localStorage.getItem('quizData'));

    if (!quizData) {
        localStorage.setItem('quizData', JSON.stringify({ hasFinished: false, time: 60000 * 20 }));
    } else if (quizData.hasFinished) {
        finishedSection.style.zIndex = finishedSection.style.opacity = 1;
        downloadButton.style.display = 'none';
    } else {

    }
}

window.addEventListener('blur', () => {
    localStorage.setItem('tab', JSON.stringify({ hasLeft: true }));
});

window.addEventListener('focus', () => {
    const tab = JSON.parse(localStorage.getItem('tab'));

    if (tab && tab.hasLeft) {
        stop();
    } 
});

start();