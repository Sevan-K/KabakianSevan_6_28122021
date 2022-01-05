// mongoose module import
const mongoose = require("mongoose");

// unique validator module import
const uniqueValidator = require("mongoose-unique-validator");

// Sauce user schema rules
const sauceShcema = mongoose.Schema({
  userID: { type: String, require: true },
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
  likes: { type: Number, require: true },
  dislikes: { type: Number, require: true },
  usersLiked: { type: [String], require: true },
  usersDisliked: { type: [String], require: true },
});

// exporting the mongoose model userSchema
module.exports = mongoose.model("Sauce", sauceShcema);
