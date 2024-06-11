module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    community_id: {
      type: Sequelize.NUMBER,
    },
    sub: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.TEXT,
    },
    created_date: {
      type: Sequelize.DATE,
    },
  });

  return Comment;
};
