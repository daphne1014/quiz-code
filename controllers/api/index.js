const router = require('express').Router();

const userRoutes = require('./user-routes');
const questionRoutes = require('./question-routes');
const scoreRoutes=require('./score-routes');

router.use('/users',userRoutes);
router.use('/questions',questionRoutes);
router.use('/scores', scoreRoutes);

module.exports = router;