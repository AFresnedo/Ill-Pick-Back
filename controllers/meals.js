const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/', (req, res) => {
  db.Meal.find()
    .then(meals => {
      console.log(meals);
      res.send(meals);
    })
    .catch(err => {
      console.log('error getting meals', err);
      res.send('error fetching meals, yell at andres');
    });
});

module.exports = router;

// router.post('/add', (req, res) => {
// console.log('req.body is', req.body);
// db.Meal.create({req.body});
// });
