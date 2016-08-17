const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, name: user.username, iat: timestamp }, config.secret);
}

exports.signin = function(req, res) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password || !username) {
    return res.status(422).send({ error: 'You must provide email, password, and username' });
  }

  // See if a user with the given email exists
  User.findOne({ where: { email: email } }).then(function(existingUserWithEmail) {

    // If a user with the email does exist, return an error
    if (existingUserWithEmail) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    User.findOne({ where: { username: username } }).then(function(existingUserWithName) {

      // If a user with the username does exist, return an error
      if (existingUserWithName) {
        return res.status(422).send({ error: 'Username is in use' });
      }

      // If a user with email or username does NOT exist, create and save user record
      const user = User.build({
        email: email,
        password: password,
        username: username
      });

      user.save().then(function() {
        // Respond to request indicating the user was created
        res.json({ token: tokenForUser(user) });
      });
    });
  });
};
