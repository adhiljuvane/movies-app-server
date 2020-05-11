const { Review } = require("../models/Review");
const { User } = require("../models/User");
var _ = require("lodash");

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

//@desc to like a review
//@route POST /api/reviews/likeOne
//access private
// const data = {
//   userFrom: localStorage.getItem("userId"),
//   movieId: props.movieId,
//   likedReview: props.reviewId,
// };
exports.likeOne = async (req, res) => {
  const options = {
    new: true,
    upsert: true,
    runValidators: true,
  };

  var doc1 = {};

  await Review.findByIdAndUpdate(
    req.body.likedReview,
    { $addToSet: { likedBy: { user: req.body.userFrom } } },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: true, err: err });
      // return res.status(200).json({ success: true, doc: doc });
      doc1 = doc;
    }
  );

  User.findByIdAndUpdate(
    req.body.userFrom,
    { $addToSet: { likedReviews: { review: req.body.likedReview } } },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: errr });
      return res.status(200).json({ success: true, doc1: doc1, doc2: doc });
    }
  );
};

//@desc to dislike a review
//@route POST /api/reviews/likeOne
//access private
// const data = {
//   userFrom: localStorage.getItem("userId"),
//   movieId: props.movieId,
//   likedReview: props.reviewId,
// };
exports.dislikeOne = async (req, res) => {
  const options = {
    new: true,
    upsert: true,
    runValidators: true,
  };

  var doc1 = {};

  await Review.findByIdAndUpdate(
    req.body.likedReview,
    {
      $addToSet: { dislikedBy: { user: req.body.userFrom } },
    },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: true, err: err });
      // return res.status(200).json({ success: true, doc: doc });
      doc1 = doc;
    }
  );

  User.findByIdAndUpdate(
    req.body.userFrom,
    { $addToSet: { dislikedReviews: { review: req.body.likedReview } } },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: errr });
      return res.status(200).json({ success: true, doc1: doc1, doc2: doc });
    }
  );
};

//@desc to get if current user liked the review.
//@route POST /api/reviews/isLiked
//access private
// const reviewData = {
//   userFrom: localStorage.getItem("userId"),
//   movieId: props.movieId,
//   reviewId: props.reviewId,
// };
exports.getLiked = async (req, res) => {
  Review.findById(req.body.reviewId, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err: err });
    if (doc) {
      let liked = _.find(doc.likedBy, { user: req.body.userFrom });
      let disliked = _.find(doc.dislikedBy, { user: req.body.userFrom });
      if (liked !== undefined) {
        return res
          .status(200)
          .json({ success: true, doc: doc, liked: true, disliked: false });
      } else if (disliked !== undefined) {
        return res
          .status(200)
          .json({ success: true, doc: doc, liked: false, disliked: true });
      } else {
        return res
          .status(200)
          .json({ success: true, doc: doc, liked: false, disliked: false });
      }
    }
  });
};
