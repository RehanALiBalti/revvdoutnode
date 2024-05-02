module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    community_id: {
      type: Sequelize.NUMBER,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    user_email: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.TEXT,
    },
  });

  return Comment;
};
