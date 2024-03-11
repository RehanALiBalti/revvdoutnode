module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    community_id: {
      type: Sequelize.NUMBER,
    },
    comments: {
      type: Sequelize.TEXT,
    },
  });

  return Comment;
};
