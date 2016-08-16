const Image = require('../models/image');
const User = require('../models/user');

exports.get = function(req, res) {
  const userId = req.param('user_id');

  if (userId) {
    Image.findAll({
      where: { userId: userId },
      order: [['updated_at', 'DESC']]
    }).then(function(images) {
      res.json(images);
    });
  } else {
    Image.findAll({
      limit: 25,
      include: [{
        model: User,
        attributes: ['id', 'username']
      }],
      order: [['updated_at', 'DESC']]
    }).then(function(images) {
      res.json(images);
    });
  }
};

exports.save = function(req, res) {
  const url = req.body.url;
  const comment = req.body.comment;
  const userId = req.user.id;

  // If there is no url , return status 422
  if (!url) {
    return res.status(422);
  }

  // Create and save the new image in the database
  Image.create({
    userId: userId,
    url: url,
    comment: comment || null
  }).then(function() {
    res.json({ success: true });
  });
};

exports.updateComment = function(req, res) {
  const imageId = req.body.imageId;
  const comment = req.body.comment;
  const userId = req.user.id;

  // If there is no imageId, return status 422
  if (!imageId) {
    return res.status(422);
  }

  Image.findById(imageId).then(function(image) {
    // If the image is not owned by the user, return status 401 (unauthorized)
    if (userId !== image.userId) {
      return res.status(401);
    }

    // Update the image's comment
    image.update({ comment: comment }).then(function() {
      res.send({ success: true });
    });
  });
};
