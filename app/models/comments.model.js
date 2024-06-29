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
    likes: {
      type: Sequelize.NUMBER,
    },
    created_date: {
      type: Sequelize.DATE,
    },
    parent_id: {
      type: Sequelize.NUMBER,
    },
    type: {
      type: Sequelize.STRING,
    },
  });

  return Comment;
};
