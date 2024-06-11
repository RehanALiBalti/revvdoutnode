module.exports = (sequelize, Sequelize) => {
  const Community = sequelize.define("community", {
    make: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.STRING,
    },
    production_years: {
      type: Sequelize.STRING,
    },
    specifications: {
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
    title: {
      type: Sequelize.STRING,
    },
  });

  return Community;
};
