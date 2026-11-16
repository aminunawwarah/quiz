function downloadSummary(responses, studentName, studentId) {
    const fonts = { Quardratic: { normal: 'Quardratic' }};
    const doc = pdfMake;
    const content = [
        {
            table: {
                body: [
                    [
                        { 
                            text: 'FAMILY HOMES ROYAL ESTATE ISLAMIYYA',
                            style: 'heading',
                            fillColor: '#000046'
                        }
                    ],
                    [
                        { 
                            text: 'QUIZ RESULT',
                            style: 'heading',
                            fillColor: '#000046'
                        }
                    ]
                ],
                widths: ['*']
            },
            layout: 'noBorders'
        },
        {
            text: `Student name: ${studentName}`,
            style: 'normalText',
            margin: [0, 10, 0, 0]
        },
        {
            text: `Quiz ID: ${studentId}`,
            style: 'normalText',
            margin: [0, 0, 0, 10]
        },
        {
            text: 'Questions and Responses',
            style: 'subheading'
        },
        [...createQuestionsHeadings(responses)],
        {
            text: 'Quiz Summary',
            style: 'subheading'
        },
        {
            text: `Number of correct answers: ${calculateSummary(responses).correctAnswers}`,
            style: 'normalText',
            margin: [0, 10, 0, 0]
        },
        {
            text: `Number of incorrect answers: ${calculateSummary(responses).incorrectAnswers}`,
            style: 'normalText'
        },
        {
            text: `Score: ${calculateSummary(responses).total} out of 60`,
            style: 'normalText'
        },
        {
            text: `Percentage: ${calculateSummary(responses).percentage.toFixed(1)}%`,
            style: 'normalText'
        }
        
    ];

    const styles = {
        heading: {
            fontSize: 18,
            font: 'Quardratic',
            alignment: 'center',
            color: '#FFFFFF'
        },
        subheading: {
            fontSize: 16,
            font: 'Quardratic',
            alignment: 'center',
            color: '#100057',
            margin: [0, 0, 0, 10]
        },
        normalText: {
            fontSize: 11.5,
            font: 'Quardratic',
            color: '#2E2E2E',
            alignment: 'justify'
        },
        question: {
            fontSize: 12,
            font: 'Quardratic',
            color: '#100057',
            fillColor: '#efeff3',
            margin: [5, 5, 5, 5]
        },
        correctResponse: {
            fontSize: 11.5,
            font: 'Quardratic',
            color: '#035800',
            alignment: 'justify'
        },
        incorrectResponse: {
            fontSize: 11.5,
            font: 'Quardratic',
            color: '#B30000',
            alignment: 'justify'
        }
    }

    doc.addFonts(fonts);
    doc.createPdf({ content, styles }).download(`${studentName}_${studentId}_Quiz_Result.pdf`);
}

function createQuestionsHeadings(responses) {
    const questions = [];
    const userResponses = prepareResponses(responses);

    for (var i = 0; i < questionTextLabels.length; i++) {
        questions.push({
            table: {
                body: [
                    [{ text: questionTextLabels[i].textContent, style: 'question' }]
                ],
                widths: '*'
            },
            layout: 'noBorders',
        }, 
        {
            text: `Your response: ${userResponses[i].selectedAnswer}`, 
            style: userResponses[i].selectedCorrectAnswer ? 'correctResponse' : 'incorrectResponse', 
            margin: [0, 10, 0, 0]
        },
        {
            text: `Correct answer: ${userResponses[i].correctAnswer}`, style: 'correctResponse', margin: [0, 0, 0, 10]
        });
    }

    return questions;
}

function prepareResponses(response) {
    const details = [];

    for (var i = 1; i <= questionTextLabels.length; i++) {
        const questionResponse = response.find(question => question.questionNumber == i);

        if (!questionResponse) {
            details.push({ 
                selectedAnswer: '(You have not answered this question.)', 
                correctAnswer: answers[i - 1].answer,
                selectedCorrectAnswer: false
            })
        } else {
            details.push({ ...questionResponse })
        }
    }

    return details;
}

function calculateSummary(responses) {
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var total = 0;
    var percentage = 0

    for (var i = 0; i < responses.length; i++) {
        if (responses[i].selectedCorrectAnswer) {
            correctAnswers++;
            total += 1.5;
        } else {
            incorrectAnswers++;
        }
    }

    percentage = total / 60 * 100;

    return { correctAnswers, incorrectAnswers, total, percentage };
}