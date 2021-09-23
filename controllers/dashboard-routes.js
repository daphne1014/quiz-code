const router = require('express').Router();
const { User, Score } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Score.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'email']
            }
        ]
    })
          .then(dbScoreData => {
            const scores = dbScoreData.map(score => score.get({ plain: true }));
            
              
            res.render('dashboard', {
               scores,
                user_id:req.session.user_id,
                username: req.session.username,
                email: req.session.email,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;