/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// sauce model import
const Sauce = require("../models/Sauce");

// fs module import
const fs = require("fs");
const { error } = require("console");
const { stringify } = require("querystring");

/* -------------------------------- */
/*      Get controlers section      */
/* -------------------------------- */
// exporting the controler to get all the sauces
exports.getAllSauces = (request, response, next) => {
  // finding all the sauces
  Sauce.find()
    // if it is OK set the answer to 200 and send sauces
    .then((sauces) => response.status(200).json(sauces))
    // if not send the error
    .catch((error) => response.status(400).json({ error }));
};

// exporting the controler to get one sauce
exports.getOneSauce = (request, response, next) => {
  // find the sauce which id is in the parameters of the request
  Sauce.findOne({ _id: request.params.id })
    // if it is OK set the answer to 200 and send the sauce
    .then((sauce) => {
      response.status(200).json(sauce);
    })
    // if not send the error
    .catch((error) => response.status(400).json({ error }));
};

/* --------------------------------- */
/*      Post controlers section      */
/* --------------------------------- */
// exporting route to create sauces
exports.createSauce = (request, response, next) => {
  // recover the sauce object (as a string) from the request
  const sauceObject = JSON.parse(request.body.sauce);
  // the autogenerated id is deleted to use MongoDB id
  delete sauceObject._id;
  // a new sauce is built from the sauceObject
  const sauce = new Sauce({
    // spread sauceObject properties to sauce
    ...sauceObject,
    // seting the right url for the image
    imageUrl: `${request.protocol}://${request.get("host")}/images/${
      request.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  // sauce is saved in MongoDB
  sauce
    .save()
    .then(() =>
      response.status(201).json({ message: "Sauce saved in database !" })
    )
    .catch((error) => response.status(400).json({ error }));
};

/* -------------------------------- */
/*      Put controlers section      */
/* -------------------------------- */
// exporting route to modify an existing sauce
exports.modifySauce = async (request, response, next) => {
  // sauce object is either :
  const sauceObject = request.file
    ? {
        // pared from stringified sauce if there is a file, spreaded
        ...JSON.parse(request.body.sauce),
        // the url of the new image saved
        imageUrl: `${request.protocol}://${request.get("host")}/images/${
          request.file.filename
        }`,
      }
    : {
        // the body of the request, spreaded
        ...request.body,
      };

  // code to be sure that the sauce belong to the user trying to modify it
  if (sauceObject.userId !== request.auth.userId) {
    return response
      .status(403)
      .json({ error: new Error("Non authorized request !") });
  }
  if (request.file) {
    // recherche de la sauce avant modification
    const sauceToUpdate = await Sauce.findOne({ _id: request.params.id });
    // if the wanted sauce is not found (necessary ??)
    if (!sauceToUpdate) {
      return response.status(404).json({
        error: new Error("No such sauce !"),
      });
    }
    // getting image name from url
    const filenameToDelete = sauceToUpdate.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filenameToDelete}`, (error) => {
      if (error) {
        console.log("failed to delete local image:" + error);
      }
    });
  }
  // the sauce which id is in request's parameters is updated
  Sauce.updateOne(
    { _id: request.params.id },
    {
      // with sauceObject values
      ...sauceObject,
      // and the correct id
      _id: request.params.id,
    }
  )
    // response status is set to OK and a message is sent
    .then(() => response.status(200).json({ message: "Sauce modified !" }))
    // response status is set to bad request and the error is sent
    .catch((error) => response.status(400).json({ error }));
};

/* ----------------------------------- */
/*      Delete controlers section      */
/* ----------------------------------- */
exports.deleteSauce = async (request, response, next) => {
  // looking for the the sauce which id is in request param
  const sauceToDelete = await Sauce.findOne({ _id: request.params.id });
  // if the wanted sauce is not found
  if (!sauceToDelete) {
    // returning a code not found and the error message
    return response
      .status(404)
      .json({ error: new Error("No such suace found !") });
  }
  // checking if the userId used to create the sauce match the one of the user trying to delete the sauce
  if (sauceToDelete.userId !== request.auth.userId) {
    // if it is not the same return a new error
    return response
      .status(403)
      .json({ error: new Error("Non authorized request !") });
  }
  // getting the name of the image to delete from iamges folder
  const filenameToDelete = sauceToDelete.imageUrl.split("/images/")[1];
  // using fs unlink
  fs.unlink(`images/${filenameToDelete}`, (error) => {
    if (error) {
      console.log("failed to delete local image:" + error);
    }
  });
  // deleting the sauce which id is in request param
  Sauce.deleteOne({ _id: request.params.id })
    // setting a no content status and a message
    .then(() => {
      response.status(200).json({ message: "Sauce deleted !" });
    })
    .catch((error) => response.status(400).json({ error }));
};

/* --------------------------------------------- */
/*      Like and Dislike controlers section      */
/* --------------------------------------------- */
// exporting the controller to handle like or dislike
exports.likesAndDislikesHandler = async (request, response, next) => {
  // looking for the sauce to like or dislike
  try {
    const likeValue = request.body.like;
    sauceToRate = await Sauce.findOne({ _id: request.params.id });
    // if the wanted sauce is not found
    if (!sauceToRate) {
      // returning a code not found and the error message
      return response
        .status(404)
        .json({ error: new Error("No such suace found !") });
    }
    // console.log("sauce avant modification", sauceToRate);
    // if like value is 1
    if (likeValue === 1) {
      // utiliser la méthode find pour savoir si le userId est déjà présent
      let isSauceRated = (userId, array) => {
        const found = array.find((element) => element === userId);
        if (!found) {
          return false;
        }
        return true;
      };
      console.log(isSauceRated(request.body.userId, sauceToRate.usersLiked));
      // if (isSauceRated(request.body.userId, sauceToRate.usersLiked)) {
      //   return response
      //     .status(403)
      //     .json({ error: new Error("Sauce already rated !") });
      // }
      // adding the userId to the usersLiked array of the sauce
      sauceToRate.usersLiked.push(request.body.userId);
      // updating the number of likes
      sauceToRate.likes = sauceToRate.usersLiked.length;
    }

    // if like value is 0
    // if like value is -1
    // modify the sauce into the database
    // console.log("sauce après modification", sauceToRate);
    sauceToRate
      .save()
      .then(() =>
        response.status(201).json({ message: "Sauce saved in database !" })
      )
      .catch((error) => response.status(400).json({ error }));

    // response.status(200).json({ message: "Sauce rated, but not saved !" });
  } catch (error) {
    console.log("Erreur : ", error);
  }
};
