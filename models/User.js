// mongoose module import
const mongoose = require("mongoose");

// unique validator plugin import
const uniqueValidator = require("mongoose-unique-validator");

// defining unser schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// adding unique validator plugin to userSchema
userSchema.plugin(uniqueValidator, {
  message: "This email address is not available",
});

// exporting the mongoose model userSchema
module.exports = mongoose.model("User", userSchema);
