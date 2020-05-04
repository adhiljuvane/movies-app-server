const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  getAllReviews,
  writeReview,
  getAllUser,
} = require("../controllers/reviews");

router.route("/getAll", auth, (req, res) => {
  getAllReviews(req, res);
});
router.route("/write", auth, (req, res) => {
  writeReview(req, res);
});
router.route("/getAllUser", auth, (req, res) => {
  getAllUser(req, res);
});
module.exports = router;
