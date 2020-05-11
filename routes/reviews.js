const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  getAllReviews,
  writeReview,
  getAllUser,
  likeOne,
  dislikeOne,
  getLiked,
} = require("../controllers/reviews");

router.post("/getAll", auth, (req, res) => {
  getAllReviews(req, res);
});

router.post("/write", auth, (req, res) => {
  writeReview(req, res);
});

router.post("/getAllUser", auth, (req, res) => {
  getAllUser(req, res);
});

router.post("/likeOne", auth, (req, res) => {
  likeOne(req, res);
});

router.post("/dislikeOne", auth, (req, res) => {
  dislikeOne(req, res);
});

router.post("/getLiked", auth, (req, res) => {
  getLiked(req, res);
});

module.exports = router;
