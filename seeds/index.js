const seedQuestions = require('./question-seeds.js');



const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedQuestions();
  console.log('--------------');

  process.exit(0);
};

seedAll();