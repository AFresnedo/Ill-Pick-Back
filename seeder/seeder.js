var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/ill-pick', function() {

  // Load Mongoose models
  seeder.loadModels([
    'models/Meal.js',
    'models/User.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['User', 'Meal'], function() {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'Meal',
    'documents': [
      {
        'name': 'Avocado Toast',
        'prep': 3,
        'ingredients': ['toast', 'avocado'],
        'funny': true
      },
      {
        'name': 'Burger',
        'prep': 15
      },
      {
        'name': 'Bacon and Eggs',
        'prep': 2,
        'ingredients': ['bacon', 'egg']
      },
      {
        'name': 'Chicken and Rice',
        'prep': 20,
        'ingredients': ['chicken', 'rice']
      },
      {
        'name': 'Pizza'
      },
      {
        'name': 'Lasagna'
      },
      {
        'name': 'Raviolli'
      },
      {
        'name': 'Burrito'
      },
      {
        'name': 'Stew'
      }
    ]
  }
];
