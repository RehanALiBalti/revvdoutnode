const db = require("../models");
const Community = db.communities;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.title &&
    !req.body.description &&
    !req.body.make &&
    !req.body.model
  ) {
    res.status(400).send({
      message: "Make, model, title, description cannot be empty!",
    });
    return;
  }

  const community = {
    title: req.body.title,
    description: req.body.description,
    make: req.body.make,
    model: req.body.model,
    production_years: req.body.production_years,
    specifications: req.body.specifications,
  };

  // Save Community in the database
  Community.create(community)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the community.",
      });
    });
};
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  Community.findAll()
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

exports.findSelected = (req, res) => {
  let condition = {};
  const make = req.query.make;
  const model = req.query.model;
  const production_years = req.query.production_years;
  const specifications = req.query.specifications;
  if (make && model) {
    condition = {
      make: make,
      model: model,
    };
  } else {
    res.status(400).send({
      message: "Make and model cannot be empty!",
    });
    return;
  }

  Community.findAll({
    where: condition,
  })
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

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Community.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Community with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Community with id=" + id,
      });
    });
};

exports.updateLikes = (req, res) => {
  const id = req.body.id;

  Community.update(
    { likes: sequelize.literal("likes + 1") },
    { where: { id: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Likes updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Likes with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Likes with id=" + id,
      });
    });
};

exports.updateDislikes = (req, res) => {
  const id = req.body.id;

  Community.update(
    { likes: sequelize.literal("likes - 1") },
    { where: { id: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Like removed successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Likes with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Likes with id=" + id,
      });
    });
};

exports.updateViews = (req, res) => {
  const id = req.body.id;

  Community.update(
    { views: sequelize.literal("views + 1") },
    { where: { id: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Views updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Views with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Views with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Community.destroy({
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
  Community.destroy({
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
  Community.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Cars.",
      });
    });
};
