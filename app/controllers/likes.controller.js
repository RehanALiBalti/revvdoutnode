const { where } = require("sequelize");
const db = require("../models");
const Likes = db.likes;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  Likes.findAll()
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

exports.likesCount = (req, res) => {
  const entity_id = req.query.id;
  const entity_type = req.query.type;

  Likes.findAndCountAll({
    where: {
      entity_id: entity_id,
      entity_type: entity_type,
      liked: 1,
    },
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

exports.dislikesCount = (req, res) => {
  const entity_id = req.query.id;
  const entity_type = req.query.type;

  Likes.findAndCountAll({
    where: {
      entity_id: entity_id,
      entity_type: entity_type,
      liked: 0,
    },
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

  Likes.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Likes with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Likes with id=" + id,
      });
    });
};

exports.updateLikes = (req, res) => {
  const entity_id = req.body.id;
  const entity_type = req.body.type;
  const sub = req.body.sub;

  Likes.findAndCountAll({
    where: { entity_id: entity_id, entity_type: entity_type, sub: sub },
  }).then((data) => {
    if (data.count == 0) {
      const likesData = {
        entity_id,
        entity_type,
        sub,
        liked: 1,
      };
      Likes.create(likesData).then((data) => {
        res.send(data);
      });
    } else {
      Likes.findOne({
        where: { entity_id: entity_id, entity_type: entity_type, sub: sub },
      }).then((data) => {
        let liked;
        if (data.liked == 1) {
          liked = 0;
        } else {
          liked = 1;
        }
        const likesData = { liked };
        Likes.update(likesData, {
          where: { entity_id: entity_id, entity_type: entity_type, sub: sub },
        }).then((num) => {
          Likes.findOne({
            where: { entity_id: entity_id, entity_type: entity_type, sub: sub },
          }).then((data) => {
            res.send(data);
          });
        });
      });
    }
  });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Likes.destroy({
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
  Likes.destroy({
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
