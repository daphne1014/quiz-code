const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Score } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Score.findAll({
        where: {
            user_id: req.session.user_id
        },
        iclude: [
            {
                model: User,
                attributes: ['id', 'username', 'email']
            }
        ]
    })
        .then(dbScoreData => {
            res.render('dashboard', {
                dbScoreData,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;