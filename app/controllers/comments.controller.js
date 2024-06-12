const db = require("../models");
const Comment = db.comments;
const User = db.users;
// const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.comments && !req.body.community_id && !req.body.sub) {
    res.status(400).send({
      message: "comments, community_id and sub fields can not be empty!",
    });
    return;
  }

  const comment = {
    community_id: req.body.community_id,
    sub: req.body.sub,
    comments: req.body.comments,
  };

  Comment.create(comment)
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
  Comment.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};

exports.findAllByCommunity = (req, res) => {
  const community_id = req.params.id;
  const query = `
  SELECT
    comments.*,
    users.nickname,
    users.image AS userimage
  FROM
    comments
  INNER JOIN
    users ON comments.sub = users.sub
  WHERE
    comments.community_id = :community_id
    GROUP by id;
`;
  console.log(query);
  sequelize
    .query(query, {
      replacements: { community_id },
      type: sequelize.QueryTypes.SELECT,
    })
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};

exports.countComments = (req, res) => {
  const community_id = req.query.community_id;
  Comment.findAndCountAll({ where: { community_id: community_id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};

// exports.findAllByCommunity = (req, res) => {
//   const community_id = req.params.id;

//   Comment.findAll({ where: { community_id: community_id } })
//     .then((data) => {
//       const newdata = [];
//       data.forEach(function (comment) {
//         User.findOne({ where: { sub: comment.sub } }).then((userdata) => {
//           comment["userImage"] = userdata.image;
//           comment["nickname"] = userdata.nickname;
//         });
//         comment["userImage"] = "userimage";
//         newdata.push(comment);
//       });
//       res.send(newdata);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Comments.",
//       });
//     });
// };

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

  Comment.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id,
      });
    });
};

exports.createComments = (req, res) => {
  if (!req.body.comments && !req.body.sub && !req.body.community_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (req.file) {
    const comment = {
      community_id: req.body.community_id,
      sub: req.body.sub,
      image: req.file.originalname,
      comments: req.body.comments,
    };
    Comment.create(comment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating comments.",
        });
      });
  } else {
    const comment = {
      community_id: req.body.community_id,
      sub: req.body.sub,
      comments: req.body.comments,
    };
    Comment.create(comment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating comments.",
        });
      });
  }
};

exports.uploadUserPhoto = (req, res) => {
  if (!req.file) {
    res.status(400).send({
      message: "Please upload user photo!",
    });
    return;
  }

  const data = {
    photo_url: req.file.originalname,
  };
  res.send(data);
};

exports.updateLikes = (req, res) => {
  const id = req.body.id;

  Comment.update(
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

  Comment.update(
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

exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Car was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Comment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Comments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Comments.",
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
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};
