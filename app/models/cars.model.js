module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("car", {
    make: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.STRING,
    },
    generation: {
      type: Sequelize.STRING,
    },
    classification: {
      type: Sequelize.STRING,
    },
    production_years: {
      type: Sequelize.STRING,
    },
    country_of_origin: {
      type: Sequelize.STRING,
    },
    notes: {
      type: Sequelize.TEXT,
    },
  });

  return Car;
};
