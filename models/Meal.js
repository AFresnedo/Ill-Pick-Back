let mongoose = require('mongoose');

let mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prep: {
    type: Number
  },
  ingredients: [{
    type: String
  }],
  funny: {
    type: Boolean,
    default: false
  }
});
