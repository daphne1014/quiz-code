const router = require('express').Router();
const { User, Score } = require('../models');
const withAuth = require('../utils/auth');

// get user scores by user id
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
            console.log(scores);

            //dashboard-design
            let correctSum = 0;
            let totalSum = 0;
            let totalSc = 0;
            let lastScore = 'No data';
            let totalScore = 'No data';

            if (scores.length > 0) {
                // last test result
                lastScore = `${scores[scores.length - 1].score}%  -  ${scores[scores.length - 1].correct}/ ${scores[scores.length - 1].total}`;
               
                //total result
                for (i = 0; i < scores.length; i++) {
                    correctSum = correctSum + scores[i].correct;
                    totalSum = totalSum + scores[i].total;
                }

                totalSc = parseInt(correctSum * 100 / totalSum);
                totalScore = `${totalSc}%  -  ${correctSum}/ ${totalSum}`
            }

            // render dashboard
            res.render('dashboard', {
                scores,
                lastScore,
                totalScore,
                user_id: req.session.user_id,
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
// render question.handlebars to add new question
router.get('/question/', withAuth, (req, res) => {

    res.render('add-question', {
        user_id: req.session.user_id,
        loggedIn: true
    });

});

//  export router

module.exports = router;