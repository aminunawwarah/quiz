function retrieveCheckedRadioButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    var checkedButtons = [];
    var response = [];

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            checkedButtons.push(radioButtons[i].id);
        }
    }

    if (checkedButtons.length === 0) {
        return [];
    }

    for (var i = 0; i < checkedButtons.length; i++) {
        const questionNumber = checkedButtons[i].split('-')[1];
        const selectedOption = checkedButtons[i].split('-')[2];

        response.push([questionNumber, selectedOption]);
    }

    return response;
}

function retrieveResponses() {
    const response = retrieveCheckedRadioButtons();
    const correctAnswers = [];
    
    if (response.length === 0) {
        return [];
    }

    for (var i = 0; i < response.length; i++) {
        const question = answers.find(answ => answ.question === response[i][0]);

        correctAnswers.push({ questionNumber: response[i][0], selectedAnswer: response[i][1], correctAnswer: question.answer });
        correctAnswers[i].selectedCorrectAnswer = response[i][1] === question.answer.slice(0, 1) ? true : false;
    }

    return correctAnswers;
}

function stop() {
    finishedSection.style.zIndex = finishedSection.style.opacity = 1;
    localStorage.setItem('quizData', JSON.stringify({ hasFinished: true }));
}

const submitButton = document.getElementById('submit-questions');
const downloadButton = document.getElementById('download-button');
const questionTextLabels = document.querySelectorAll('.question-title');
const finishedSection = document.querySelector('.finished-section');
const studentName = document.querySelector('.student-name-text').innerText;
const studentId = document.querySelector('.quiz-id-text').innerText;

submitButton.addEventListener('click', stop);
downloadButton.addEventListener('click', () => downloadSummary(retrieveResponses(), studentName, studentId));