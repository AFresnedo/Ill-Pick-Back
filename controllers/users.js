const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/randFave', (req, res) => {
  db.User.findById(req.user.id)
    .populate('meal')
    .then(users => {
      let index = Math.floor(Math.random() * Math.floor(users.meals.length));
      res.send(users.meals[index]);
    })
    .catch(err => {
      console.log('error getting random fave for user:', err);
      res.send('error getting random favorite');
    });
});

router.post('/setFaves', (req, res) => {
  console.log("THE REQ INFO: ", req.body.user.id)
  console.log("THE FAVES ARE: ", req.body.faves)
  db.User.findByIdAndUpdate(req.body.user.id, {$set: {faves: req.body.faves}})
    .then(user => {
      console.log('Successful Update')
      res.send(updatedFaves)
    })
    .catch(err => {
      console.log('err setting faves', err);
      res.send('error setting favorites');
    });
});

module.exports = router;
