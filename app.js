//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

// fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit ({
  name: "Mango",
  score: 9,
  review: "Decent fruit."
});

  mango.save();

  Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err){
    if (err){
      console.log(err);
    } else {
      console.log("Succesfully updated the document");
    }
  });

// const person = new Person ({
//   name: "John",
//   age: 37,
//   favoriteFruit: pineapple
// });

// person.save();

// <-- Creating the js objects that we want to insert to db -->
// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// });
//
// const orange = new Fruit ({
//   name: "orange",
//   score: 4,
//   review: "Too sour for me"
// });
//
// const banana= new Fruit ({
//   name: "Banana",
//   score: 3,
//   review: "Weird Texture"
// });


// <-- Creating the insert many function to insert a few objects at one time to the db -->

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Succesfully saved aall the fruits to fruitsDB ");
//   }
// });


Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else{

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id: "62b984db889e8b202e6e7e3e"}, {name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Succesfully updated the document");
//   }
// });

// Fruit.deleteOne({name:"Apple"}, function(err) {
//     if(err){
//       console.log(err);
//     } else {
//       console.log("Succesfully deleted document");
//     }
//
// });


// Person.deleteMany( {name: "John"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted all the documents");
//   }
// });
