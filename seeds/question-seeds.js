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
  {
    question_text: 'True of False you can declare variables in multiple ways',
    answer: true
  },
  {
    question_text: 'True of False JavaScript files need to be named with a .js',
    answer: true
  },
  {
    question_text: 'True of False one way to check if your code is working you can use window.alert',
    answer: true
  },
  {
    question_text: 'True of False when chaining strings to other strings you use * symbol',
    answer: false
  },
  {
    question_text: 'True of False CSS is an acronym for Cascading Style Sheets',
    answer: true
  },
  {
    question_text: 'True of False to set conditions within JavaScript you use an if statement',
    answer: true
  },
  {
    question_text: 'True of False an example of control flow is an if, else statement.',
    answer: true
  },
  {
    question_text: 'True of False a way to check your code is a window.altert() command.',
    answer: true
  },
  {
    question_text: 'True of False a way to check for a truthy statment you can you =',
    answer: false
  },
  {
    question_text: 'True of False || means or. ',
    answer: true
  },
  {
    question_text: 'True of False Pseudocode is offical JS language.',
    answer: false
  },
  {
    question_text: 'True of False an array is an example of primitave data.',
    answer: false
  },
  {
    question_text: 'True of False an array can store multiple pieces of data.',
    answer: true
  },
  {
    question_text: 'True of False when accessing data in an array you start counting with 1',
    answer: false
  },
  {
    question_text: 'True of False a statement of undefined means you have an error within your code',
    answer: true
  },
  {
    question_text: 'A for loop is esential for web development.  It allows your to iterate over an array.  Ture or False: There are three parts to the for loop.  1) an inital expression ie var i = 0, 2) The condiditon ie i < legth of array, 3) Increment expression ie i++. ',
    answer: true
  },
  {
    question_text: 'True of False examples of casses is an if, else if statment.',
    answer: true
  },
  
];

const seedQuestions = () => Question.bulkCreate(questionsdata);

module.exports = seedQuestions;
