const db = require("../models");
const Story = db.stories;
// const Op = db.Sequelize.Op;
// const sequelize = db.sequelize;

exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  Story.findAll({ where: { status: 1 } })
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

  Story.findOne({ where: { id: id, status: 1 } })
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
    !req.body.story &&
    !req.body.user_name &&
    !req.body.story_name &&
    !req.body.user_email
  ) {
    res.status(400).send({
      message:
        "Story, story name, user name and user email are required fields!",
    });
    return;
  }

  if (req.files) {
    const filesArrayObject = req.files;
    const filesArray = [];
    filesArrayObject.forEach(function (file) {
      filesArray.push("https://king-prawn-app-3rw3o.ondigitalocean.app/stories/"+file.filename);
    });
    const filesJson = JSON.stringify(filesArray);
    const story = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      story_type: req.body.story_type,
      story: req.body.story,
      modifications: req.body.modifications,
      memorable: req.body.memorable,
      advice: req.body.advice,
      story_name: req.body.story_name,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      social_media: req.body.social_media,
      country: req.body.country,
      city: req.body.city,
      story_history: req.body.story_history,
      adventure_story: req.body.adventure_story,
      images: filesJson,
    };
    Story.create(story)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating story.",
        });
      });
  } else {
    const story = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      story_type: req.body.story_type,
      story: req.body.story,
      modifications: req.body.modifications,
      memorable: req.body.memorable,
      advice: req.body.advice,
      story_name: req.body.story_name,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      social_media: req.body.social_media,
      country: req.body.country,
      city: req.body.city,
      story_history: req.body.story_history,
      adventure_story: req.body.adventure_story,
    };
    Story.create(story)
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
//ALTER TABLE `stories` CHANGE `year` `year` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL;
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
