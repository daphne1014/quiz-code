const { Question } = require('../models');

const questionsdata = [
  {
    question_text: 'Question 1',
    answer: false
  },
  {
    question_text: 'Question 2',
    answer: false
  },
  {
    question_text: 'Question 3',
    answer: true
  }
  
];

const seedQuestions = () => Question.bulkCreate(questionsdata);

module.exports = seedQuestions;
