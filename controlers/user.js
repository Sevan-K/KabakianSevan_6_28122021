/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// user model import
const User = require("../models/User");

// bcrypt module import
const bcrypt = require("bcrypt");

// jsonwebtoken module import
const jasonwebtoken = require("jsonwebtoken");

/* ---------------------------------- */
/*      Signup controler section      */
/* ---------------------------------- */
exports.signup = (request, response, next) => {
  const salt = parseInt(process.env.SALT);
  bcrypt
    // using bcryp to hash the pasword with a salt value of 10

    .hash(request.body.password, salt)
    // then we get the hash
    .then((hash) => {
      // a new user is created
      const user = new User({
        // email is recoverd from the request
        email: request.body.email,
        // passwaord is stored once hashed
        password: hash,
      });
      // the user need to be saved into de database
      user
        .save()
        // response status is set to 201
        .then(() =>
          response.status(201).json({ message: "User created and saved !" })
        )
        // catching an erroe while saving the created user
        .catch((error) => response.status(400).json({ error }));
    })
    // catching error while creating user
    .catch((error) => {
      console.log("voilà l'erreur : ", error);
      response.status(500).json({ error });
    });
};

/* --------------------------------- */
/*      Login controler section      */
/* --------------------------------- */
exports.login = async (request, response, next) => {
  // const sentPassword = await bcrypt.hash(
  //   request.body.password,
  //   process.env.SALT
  // );
  // console.log(sentPassword);
  try {
    // looking for the user with the same email than the one in the request's body
    const user = await User.findOne({ email: request.body.email });
    // if user is not defined
    if (!user) {
      let error = new Error("User not found !");
      // return an error saying that user has not been found
      return response.status(400).json({ message: error.message });
    }
    try {
      // if the user is found the pasword is compared using bcrypt
      const isPasswordValid = await bcrypt.compare(
        request.body.password,
        user.password
      );
      // if the password does not match
      if (!isPasswordValid) {
        let error = new Error("Invalid pasword !");
        // return an error and a message saying that the pasword is invalid
        return response.status(401).json({ message: error.message });
      }
      // the password is correct, the following response is given
      response.status(200).json({
        userId: user._id,
        token: jasonwebtoken.sign({ userId: user._id }, process.env.JWT_KEY, {
          expiresIn: "24h",
        }),
      });
    } catch (error) {
      // catching an error while comparing the password
      (error) =>
        response.status(error.status || 500).json({ message: error.message });
    }
  } catch (error) {
    // catching an error while looking for the user
    response.status(error.status || 500).json({ message: error.message });
  }
};
