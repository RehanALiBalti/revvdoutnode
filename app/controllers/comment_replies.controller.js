const db = require("../models");
const Reply = db.comment_replies;
// const Op = db.Sequelize.Op;
// const sequelize = db.sequelize;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.comments) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const comment = {
    comment_id: req.body.comment_id,
    comments: req.body.comments,
  };

  Reply.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Reply.",
      });
    });
};
//De Voluu
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  Reply.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Replies.",
      });
    });
};

exports.findAllByComment = (req, res) => {
  const comment_id = req.params.id;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  Reply.findAll({ where: { comment_id: comment_id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Replies.",
      });
    });
};

exports.findSelected = (req, res) => {
  let condition = {};
  const make = req.query.make;
  const model = req.query.model;
  if (make) {
    condition = { make: make };
  }
  if (model) {
    condition = { make: make, model: model };
  }

  Reply.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Replies.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Reply.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Reply with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Reply with id=" + id,
      });
    });
};

exports.createReplies = (req, res) => {
  if (!req.body.comments && !req.body.user_email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (req.file) {
    const reply = {
      comment_id: req.body.comment_id,
      parent_id: req.body.parent_id,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      comments: req.body.comments,
      image: req.file.originalname,
    };
    Reply.create(reply)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating reply.",
        });
      });
  } else {
    const reply = {
      comment_id: req.body.comment_id,
      parent_id: req.body.parent_id,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      comments: req.body.comments,
    };
    Reply.create(reply)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating reply.",
        });
      });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Reply.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Reply was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Reply with id=${id}. Maybe Car was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Reply with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Reply.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Replies were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all replies.",
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Reply.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving replies.",
      });
    });
};
