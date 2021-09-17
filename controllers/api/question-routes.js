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

  // create new question
router.post('/', (req, res) => {

  Question.create({
      question_text: req.body.username,
      answer: req.body.email,
      password: req.body.password
  })

  .then(dbUserData => {
          req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;

              res.json(dbUserData);
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});
  

module.exports = router;