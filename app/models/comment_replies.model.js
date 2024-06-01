module.exports = (sequelize, Sequelize) => {
  const Reply = sequelize.define("comment_replies", {
    comment_id: {
      type: Sequelize.NUMBER,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    user_email: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.TEXT,
    },
    created_date: {
      type: Sequelize.DATE,
    },
  });

  return Reply;
};
