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

module.exports = router;