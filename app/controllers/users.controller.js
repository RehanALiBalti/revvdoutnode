const db = require("../models");
import twilio from "twilio";
const User = db.users;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = async (req, res) => {
  if (!req.body.sub) {
    res.send({
      message: "sub id field cannot be empty!",
    });
    return;
  }

  const oldUser = await User.findOne({
    where: { sub: req.body.sub },
  });

  if (oldUser !== null) {
    res.send({
      message: `User already exists with sub id = ${req.body.sub}`,
    });
    return;
  }

  const user = {
    name: req.body.name,
    cognitoId: req.body.cognitoId,
    nickname: req.body.nickname,
    sub: req.body.sub,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    phone: req.body.phone,
    socialMedia: req.body.socialMedia,
    check1: req.body.check1,
    check2: req.body.check2,
    street: req.body.street,
    streetNo: req.body.streetNo,
    street2: req.body.street2,
    zipCode: req.body.zipCode,
    city: req.body.city,
    country: req.body.country,
    intlPrefix1: req.body.intlPrefix1,
    intlPrefix2: req.body.intlPrefix2,
    intlPrefix3: req.body.intlPrefix3,
    prefix1: req.body.prefix1,
    prefix2: req.body.prefix2,
    prefix3: req.body.prefix3,
    fax: req.body.fax,
    mobilePhone: req.body.mobilePhone,
    role: req.body.role,
  };
  // Save user in the database
  await User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.verifyPhone = async (req, res) => {
  if (!req.body.phone) {
    res.send({
      message: "Phone field cannot be empty!",
    });
    return;
  }
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  const verifyCode = "12345";

  const twilioResponse = await client.messages.create({
    body: "Here is your verification code from revvdout : " + verifyCode,
    from: "+15017122661",
    to: phone,
  });
  if (!twilioResponse.error_code) {
    res.send({
      message: "SMS sent to client with verification code",
    });
  } else {
    res.status(500).send({
      message: twilioResponse.error_message,
    });
  }
};

exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving communities.",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const oldUser = await User.findOne({
    where: { phone: req.body.phone },
  });

  if (oldUser !== null) {
    res.send({
      message: `Phone number already exists, phone number = ${req.body.phone}`,
    });
    return;
  }

  if (req.file) {
    req.body.image = req.file.filename;
  }

  User.update(req.body, {
    where: { sub: id },
  })
    .then((num) => {
      if (num == 1) {
        User.findOne({ where: { sub: id } })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving User.",
            });
          });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.updateUser = async (req, res) => {
  const sub = req.body.sub;

  const oldUser = await User.findOne({
    where: { phone: req.body.phone },
  });

  if (oldUser !== null) {
    res.send({
      message: `Phone number already exists, phone number = ${req.body.phone}`,
    });
    return;
  }

  if (req.file) {
    req.body.image = req.file.filename;
  }

  User.update(req.body, {
    where: { sub: sub },
  })
    .then((num) => {
      if (num == 1) {
        User.findOne({ where: { sub: sub } })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving User.",
            });
          });
      } else {
        res.send({
          message: `Cannot update User with id=${sub}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + sub,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

exports.findByUsername = (req, res) => {
  const nickname = req.query.nickname;
  User.findAndCountAll({ where: { nickname: nickname } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};

exports.findBySub = (req, res) => {
  const sub = req.query.sub;
  User.findOne({ where: { sub: sub } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};
