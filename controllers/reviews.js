const { Review } = require("../models/Review");

//@desc to get all reviews of a movie.
//@route POST /api/reviews/getAll
//access private
exports.getAllReviews = (req, res) => {
  try {
    Review.find({ movieId: req.body.movieId }).exec((err, reviews) => {
      if (err) return res.status(400).json({ success: false, err: err });
      res.status(200).json({ success: true, reviews: reviews });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

//@desc to write a review for a movie.
//@route POST /api/reviews/write
//access private
exports.writeReview = (req, res) => {
  try {
    const review = new Review(req.body);

    review.save((err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      res.status(200).json({ success: true, doc: doc });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

//@desc to get all reviews written by one user.
//@route POST /api/reviews/getAllUser
//access private
exports.getAllUser = (req, res) => {
  try {
    Review.find({ userFrom: req.body.userFrom }).exec((err, reviews) => {
      if (err) return res.status(400).json({ success: false, err: err });
      res.status(200).json({ success: true, reviews: reviews });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};
