module.exports = (sequelize, Sequelize) => {
  const Community = sequelize.define("community", {
    make: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.STRING,
    },
    generation: {
      type: Sequelize.STRING,
    },
    production_years: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    likes: {
      type: Sequelize.NUMBER,
    },
    comments: {
      type: Sequelize.NUMBER,
    },
    views: {
      type: Sequelize.NUMBER,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return Community;
};
