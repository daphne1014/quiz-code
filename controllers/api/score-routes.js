const router = require('express').Router();
const { User,Score } = require('../../models');

router.get('/', (req, res) => {
    Score.findAll()
      .then(dbScoreData => res.json(dbScoreData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//get scores by id
router.get('/:id', (req, res) => {
  Score.findOne({
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
    .then(dbScoreData => {
      if (!dbScoreData) {
        res.status(404).json({ message: 'No score found with this id' });
        return;
      }
      res.json(dbScoreData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// create new score
router.post('/', (req, res) => {

  Score.create({
    score: req.body.score,
    correct: req.body.correct,
    total: req.body.total,
    user_id: req.body.user_id
  })

    .then(dbScoreData => res.json(dbScoreData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update score
router.put('/:id',(req, res) => {
  Score.update(
    {
      score: req.body.score_score
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbScoreData => {
    if (!dbScoreData) {
      res.status(404).json({ message: 'No score found with this id' });
      return;
    }
    res.json(dbScoreData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Score.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbScoreData => {
      if (!dbScoreData) {
        res.status(404).json({ message: 'No score found with this id' });
        return;
      }
      res.json(dbScoreData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;