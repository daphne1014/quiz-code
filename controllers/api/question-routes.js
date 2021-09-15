const router = require('express').Router();
const { Question } = require('../../models');

//get all questions
router.get('/', (req, res) => {
    Question.findAll()
      .then(dbQuestionData => res.json(dbQuestionData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;