module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("likes", {
    entity_id: {
      type: Sequelize.NUMBER,
    },
    entity_type: {
      type: Sequelize.STRING,
    },
    sub: {
      type: Sequelize.STRING,
    },
    liked: {
      type: Sequelize.NUMBER,
    },
    created_date: {
      type: Sequelize.DATE,
    },
  });

  return Likes;
};
