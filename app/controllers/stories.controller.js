const db = require("../models");
const Story = db.stories;
// const Op = db.Sequelize.Op;
// const sequelize = db.sequelize;

exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  Story.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
};

exports.findAllByCommunity = (req, res) => {
  const community_id = req.params.id;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  Story.findAll({ where: { community_id: community_id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
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

  Story.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Story.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find story with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving story with id=" + id,
      });
    });
};

exports.create = (req, res) => {
  if (
    !req.body.make &&
    !req.body.model &&
    !req.body.story &&
    !req.body.user_name &&
    !req.body.user_email
  ) {
    res.status(400).send({
      message: "Make, model, story, user namd and email are required fields!",
    });
    return;
  }

  if (req.files) {
    const filesArrayObject = req.files;
    const filesArray = [];
    filesArrayObject.forEach(function (file) {
      filesArray.push(file.filename);
    });
    const filesJson = JSON.stringify(filesArray);
    const comment = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      story: req.body.story,
      modifications: req.body.modifications,
      memorable: req.body.memorable,
      advice: req.body.advice,
      story_name: req.body.social_media,
      make: req.body.make,
      model: req.body.model,
      model: req.body.model,
      year: req.body.year,
      images: filesJson,
    };
    Story.create(comment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating story.",
        });
      });
  } else {
    const comment = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      story: req.body.story,
      modifications: req.body.modifications,
      memorable: req.body.memorable,
      advice: req.body.advice,
      story_name: req.body.social_media,
      make: req.body.make,
      model: req.body.model,
      model: req.body.model,
      year: req.body.year,
    };
    Story.create(comment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating story.",
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

exports.delete = (req, res) => {
  const id = req.params.id;

  Story.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Story was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete story with id=${id}. Maybe story was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete story with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Story.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Car were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stories.",
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Story.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
};
