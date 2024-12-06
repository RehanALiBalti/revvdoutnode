module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    cognitoId: {
      type: Sequelize.STRING,
    },
    nickname: {
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
    preferedCar1: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    preferedCar2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    preferedCar3: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car0carId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car0make: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car0model: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car0year: {
      type: Sequelize.STRING, // Use INTEGER for year
      allowNull: true,
    },
    car0cardSpec: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car1carId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car1make: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car1model: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car1year: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car1cardSpec: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car2carId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car2make: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car2model: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car2year: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car2cardSpec: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car3carId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car3make: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car3model: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car3year: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car3cardSpec: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car4carId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car4make: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car4model: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car4year: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car4cardSpec: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car5carId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car5make: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car5model: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car5year: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    car5cardSpec: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return User;
};
