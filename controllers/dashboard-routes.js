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
             lastScore=`${scores[scores.length-1].score}%  -  ${scores[scores.length-1].correct}/ ${scores[scores.length-1].total}`;
             let correctSum=0; 
             let totalSum=0; 
             for (i=0;i<scores.length;i++){
                correctSum=correctSum + scores[scores.length-1].correct;
                totalSum= totalSum+ scores[scores.length-1].total;
             }
             totalSc=parseInt(correctSum*100/totalSum);
             totalScore= `${totalSc}%  -  ${correctSum}/ ${totalSum}`

            res.render('dashboard', {
               scores,
               lastScore,
               totalScore,
                user_id:req.session.user_id,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;