const { Favourite } = require("../models/Favourite");

//@desc to find favourite information insideinside Favourite collection by movieId.
//@route POST /api/favourite/favouriteNumber
//access private
exports.getFavouriteNumber = (req, res) => {
  try {
    Favourite.find({ movieId: req.body.movieId }).exec((err, favourite) => {
      if (err) return res.status(400).send({ success: false, err: err });
      res
        .status(200)
        .json({ success: true, favouriteNumber: favourite.length });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

//@desc to find if I have added this to my favourites.
//@route POST /api/favourite/favourited
//access private
exports.getFavourited = (req, res) => {
  try {
    Favourite.find({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec((err, favourite) => {
      if (err) return res.status(400).json({ success: false, err: err });
      let result = false;
      if (favourite.length !== 0) {
        result = true;
      }
      return res.status(200).json({ success: true, favourited: result });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

//@desc to add the movie to favourites.
//@route POST /api/favourite/addToFavourite
//access private
exports.addToFavourites = (req, res) => {
  try {
    const favourite = new Favourite(req.body);

    favourite.save((err, doc) => {
      if (err) return res.json({ success: false, err: err });
      return res.status(200).json({ success: true, doc });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

//@desc to remove from favourites.
//@route POST /api/favourite/removeFromFavourites
//access private
exports.removeFromFavourites = (req, res) => {
  try {
    Favourite.findOneAndDelete({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec((err, doc) => {
      if (err) return res.status(400).json({ success: true, err: err });
      return res.status(200).json({ success: true, doc });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

//@desc to get favourite movies of a user.
//@route POST /api/favourite/getFavouriteMovies
//access private
exports.getFavouriteMovies = (req, res) => {
  try {
    Favourite.find({ userFrom: req.body.userFrom }).exec((err, favourites) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, favourites: favourites });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};
