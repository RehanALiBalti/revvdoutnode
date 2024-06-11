module.exports = (sequelize, Sequelize) => {
  const Reply = sequelize.define("comment_replies", {
    comment_id: {
      type: Sequelize.NUMBER,
    },
    sub: {
      type: Sequelize.TEXT,
    },
    comments: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
    },
    likes: {
      type: Sequelize.NUMBER,
    },
    created_date: {
      type: Sequelize.DATE,
    },
    parent_id: {
      type: Sequelize.NUMBER,
    },
  });

  return Reply;
};
