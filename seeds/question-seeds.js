const { Question } = require('../models');

const questionsdata = [
  {
    question_text: 'True or False HTML is an acronym for Hypertext Markup Language',
    answer: true
  },
  {
    question_text: 'True of False the file for should be named Index.html',
    answer: false
  },
  {
    question_text: 'True or False There are somatic elements that are used to create the bones of the webpage.',
    answer: true
  },
  {
    question_text: 'True or False The correct formatting for a header is <header> </header>.',
    answer: true
  },
  {
    question_text: 'True or False SEO stands for Search Engine Observation. ',
    answer: false
  },
  {
    question_text: 'True or False SEO stands for Search Engine Observation. ',
    answer: false
  },
  {
    question_text: 'True of False CSS is an acronym for Cascading Style Sheets',
    answer: true
  },
  
];

const seedQuestions = () => Question.bulkCreate(questionsdata);

module.exports = seedQuestions;
