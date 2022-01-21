// mongoose module import
const mongoose = require("mongoose");

// regex for name and
const regexForNames =
  /^\b((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9. ']{2,30}(?<!-)(?<!'))$/;
// regex for name and
const regexForDescription =
  /^\b((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9!,?. ']{2,100}(?<!-)(?<!'))$/;

// Sauce user schema rules
const sauceShcema = mongoose.Schema({
  userId: { type: String, require: true },
  name: {
    type: String,
    require: true,
    // validation entry for name
    validate: {
      validator: (value) => regexForNames.test(value),
      message: (props) =>
        `${props.value} is not a valid name (Only words, . and - are allowed) or too long (max 30 characters)`,
    },
  },
  manufacturer: {
    type: String,
    require: true,
    validate: {
      // validation entry for manufacturer
      validator: (value) => regexForNames.test(value),
      message: (props) =>
        `${props.value} is not a valid name (Only words, . and - are allowed) or too long (max 30 characters)`,
    },
  },
  description: {
    type: String,
    require: true,
    // validation entry for description
    validate: {
      validator: (value) => regexForDescription.test(value),
      message: (props) =>
        `${props.value} is not a valid name (Only words, . and - are allowed) or too long (max 100 characters)`,
    },
  },
  mainPepper: {
    type: String,
    require: true,
    // validation entry for mainPepper
    validate: {
      validator: (value) => regexForNames.test(value),
      message: (props) =>
        `${props.value} is not a valid name (Only words, . and - are allowed)`,
    },
  },
  imageUrl: { type: String, require: true },
  heat: { type: Number, min: 1, max: 10, require: true },
  likes: { type: Number, require: true },
  dislikes: { type: Number, require: true },
  usersLiked: { type: [String], require: true },
  usersDisliked: { type: [String], require: true },
});

// exporting the mongoose model userSchema
module.exports = mongoose.model("Sauce", sauceShcema);
