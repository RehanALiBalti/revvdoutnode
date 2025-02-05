module.exports = {
  HOST: "terraform-20250204113159431200000001.cfkywe2k2d3m.eu-central-1.rds.amazonaws.com",
  USER: "buzzware",
  PASSWORD: "StrongPass123!",
  DB: "revvdout_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
