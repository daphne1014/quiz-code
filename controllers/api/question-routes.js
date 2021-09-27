const router = require('express').Router();
const { Question, User } = require('../../models');

//get all questions
router.get('/', (req, res) => {
  Question.findAll()
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//get question by id
router.get('/:id', (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    iclude: [
      {
        model: User,
        attributes: ['id', 'username', 'email']
      }
    ]
  })
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No question found with this id' });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// create new question
router.post('/', (req, res) => {

  Question.create({
    question_text: req.body.question_text,
    answer: req.body.answer,
    user_id: req.body.user_id
  })

    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update question
router.put('/:id',(req, res) => {
  Question.update(
    {
      question_text: req.body.question_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbQuestionData => {
    if (!dbQuestionData) {
      res.status(404).json({ message: 'No question found with this id' });
      return;
    }
    res.json(dbQuestionData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
// delete question
router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Question.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No question found with this id' });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;