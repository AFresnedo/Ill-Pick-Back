const express = require('express');
const router = express.Router();

const async = require('async');

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

router.post('/setFaves', (req, res) => {
  console.log("THE REQ.BODY INFO: ", req.body);
  console.log("THE FAVES ARE: ", req.body.faves);
  let faves = req.body.faves;
  let faveIds = [];
  async.each(faves, async function(fav, done) {
    await db.Meal.find({
      name: fav
    })
      .then(foundFav => {
        console.log('found fav:', foundFav);
        console.log('toAdd meal id:', foundFav[0].id);
        if (!faveIds.includes(foundFav[0].id)) {
          console.log('adding new fav');
          faveIds.push(foundFav[0].id);
        }
      })
      .catch(err => {
        console.log('err setting faves', err);
      });
    done();
  }, function() {
    console.log('reached toSave & faves is:', faveIds);
    db.User.findById(req.body.user.id)
      .then(user => {
        console.log('found user:', user);
        console.log('adding meals:', faves);
        user.faves = faveIds;
        user.save();
      })
      .catch(err => {
        console.log('err setting faves', err);
      });
  });
  // TODO create a list of references
  // let testMeal;
  // await db.Meal.find({
  // name: req.body.faves[0]
  // }).
  // then(found => {
  // testMeal = found;
  // console.log('added', testMeal);
  // })
  // .catch(err => {
  // });
});

module.exports = router;
