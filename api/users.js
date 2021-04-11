require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const CLIENT_SECRET = process.env.CLIENT_SECRET
const db = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', (req, res) => {
  res.json({ message: 'User endpoint' })
})

router.post('/register', (req, res) => {
  db.User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      return res.status(400).json({ msg: 'Email is already registered'})
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw Error;
        bcrypt.hasn(newUser.password, salt, (error, hash) => {
          if (error) throw Error;
          newUser.password = hash;
          newUser.save()
          .then(createdUser => res.json(createdUser))
          .catch(err => console.log(err))
        })
      })
    }
  })
})

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.User.findOne({ email })
  .then(user => {
    if (!user) {
      res.status(400).json({ msg: 'User not found' })
    } else {
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
            name: user.name
          }
          jwt.sign(payload, CLIENT_SECRET, { expiresIn: '1h' }, (error, token) => {
            res.json({
              token: `Bearer ${token}`,
            })
          })
        } else {
          return res.status(400).json({ msg: 'Email or password is incorrect' })
        }
      })
    }
  })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;
