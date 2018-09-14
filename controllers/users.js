const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/randFave', (req, res) => {
  db.User.findById(req.body.id)
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
  console.log("THE REQ.BODY INFO: ", req.body)
  console.log("THE FAVES ARE: ", req.body.faves)
  let faves = req.body.faves
  // TODO create a list of references
  db.User.findById(req.body.user.id)
    .then(user => {
      console.log('found user:', user);
      user.save(() => {
        let userToSave = new db.User({
          name: req.body.name,
          faves: req.body.faves
        });
      });
      console.log('Successful Update')
      // res.send(updatedFaves)
    })
    .catch(err => {
      console.log('err setting faves', err);
    });
});

module.exports = router;
