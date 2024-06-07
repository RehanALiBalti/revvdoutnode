module.exports = (sequelize, Sequelize) => {
  const Story = sequelize.define("stories", {
    user_name: {
      type: Sequelize.STRING,
    },
    user_email: {
      type: Sequelize.STRING,
    },
    make: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
    story_name: {
      type: Sequelize.STRING,
    },
    story: {
      type: Sequelize.TEXT,
    },
    modifications: {
      type: Sequelize.TEXT,
    },
    memorable: {
      type: Sequelize.TEXT,
    },
    advice: {
      type: Sequelize.TEXT,
    },
    social_media: {
      type: Sequelize.TEXT,
    },
    images: {
      type: Sequelize.TEXT,
    },
    created_date: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.NUMBER,
    },
  });

  return Story;
};
