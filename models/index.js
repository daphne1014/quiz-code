//import all models

const Question = require('./Question');
const Score = require('./Score');
const User = require('./User');

//create associations
User.hasMany(Score,{
    foreignKey: 'user_id'
});

Score.belongsTo(User,{
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = {Question,Score,User};

