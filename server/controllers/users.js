const User = require('../models/user');

exports.get = function(req, res) {
  const id = req.param('id');

  User.findById(id)
    .then(function(user) {
      res.json({ username: user.username });
    });
};

exports.search = function(req, res) {
  const query = req.param('query');

  User.findAll({
    where: { username: { $like: '%'+query+'%'} },
    attributes: ['id', 'username']
  }).then(function(users) {
    res.json(users);
  });
};
