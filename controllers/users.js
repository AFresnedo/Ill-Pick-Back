const express = require('express');
const router = express.Router();

const db = require('../models');

router.post('/randFave', (req, res) => {
  console.log('reqbodyId is:', req.body.id);
  db.User.findById(req.body.id)
    .populate('faves')
    .then(user => {
      console.log('found user for randFave:', user);
      console.log('faves is', user.faves);
      let index = Math.floor(Math.random() * Math.floor(user.faves.length));
      res.send(user.faves[index]);
    })
    .catch(err => {
      console.log('failed to perform DB query for randFave', err);
      // console.log('error getting random fave for user:', err);
      res.send('error getting random favorite');
    });
});

router.post('/setFaves', async (req, res) => {
  console.log("THE REQ.BODY INFO: ", req.body)
  console.log("THE FAVES ARE: ", req.body.faves)
  let faves = req.body.faves
  // TODO create a list of references
  let testMeal;
  await db.Meal.find({
    name: req.body.faves[0]
  }).
    then(found => {
      testMeal = found;
      console.log('added', testMeal);
    })
    .catch(err => {
    });
  db.User.findById(req.body.user.id)
    .then(user => {
      console.log('found user:', user);
      console.log('adding meal id:', testMeal[0].id);
      user.update({
        name: user.name,
        faves: [testMeal[0].id],
        password: user.password
      });
      // user.save(() => {
      // let userToSave = new db.User({
      // name: user.name,
      // faves: [testMeal[0].id],
      // password: user.password
      // });
      // })
    })
    .catch(err => {
      console.log('err setting faves', err);
    });
});

module.exports = router;
