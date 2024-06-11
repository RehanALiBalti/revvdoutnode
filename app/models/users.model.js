module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    cognitoId: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    sub: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    socialMedia: {
      type: Sequelize.STRING,
    },
    check1: {
      type: Sequelize.STRING,
    },
    check2: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
    },
    streetNo: {
      type: Sequelize.STRING,
    },
    street2: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    intlPrefix1: {
      type: Sequelize.STRING,
    },
    intlPrefix2: {
      type: Sequelize.STRING,
    },
    intlPrefix3: {
      type: Sequelize.STRING,
    },
    prefix1: {
      type: Sequelize.STRING,
    },
    prefix2: {
      type: Sequelize.STRING,
    },
    prefix3: {
      type: Sequelize.STRING,
    },
    fax: {
      type: Sequelize.STRING,
    },
    mobilePhone: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
