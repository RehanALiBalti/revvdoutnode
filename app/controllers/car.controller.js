const db = require("../models");
const Car = db.cars;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const car = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  Car.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Car.",
      });
    });
};
//De Voluu
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  Car.findAll({ attributes: ["make"], group: ["make"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving car makes.",
      });
    });
};

exports.findModels = (req, res) => {
  const make = req.query.make;
  var condition = make ? { make: { [Op.like]: `%${make}%` } } : null;

  // Car.findAll({ where: condition })
  Car.findAll({ where: condition, attributes: ["model"], group: ["model"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving car models.",
      });
    });
};

exports.findGenerations = (req, res) => {
  const model = req.query.model;
  var condition = model ? { model: { [Op.like]: `%${model}%` } } : null;

  // Car.findAll({ where: condition })
  Car.findAll({
    where: condition,
    attributes: [
      "generation",
      "classification",
      "production_years",
      "country_of_origin",
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving car data.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Car.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Car with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Car was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Car with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Car was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Car were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Cars.",
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Cars.",
      });
    });
};
