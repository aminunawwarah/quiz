const fs = require('fs');
const express = require('express');
const app = express();

function start() {
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('rsc'));
    app.listen(process.env.PORT || 8080);
    app.get('/', (req, res) => res.render('home'));
    app.post('/questions', (req, res) => {
        const quizID = req.body.quizID;
        const ids = JSON.parse(fs.readFileSync('./data/ids.json'));
        const questions = JSON.parse(fs.readFileSync('./data/questions.json'));
        const currentUser = ids.find(user => user.id === quizID);

        if (!currentUser) {
            res.render('error', { quizID });
        } else {
            res.render('questions', { currentUser, questions });
        }
    });
}

module.exports = { start };