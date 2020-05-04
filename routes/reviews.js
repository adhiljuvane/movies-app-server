const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  getAllReviews,
  writeReview,
  getAllUser,
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
module.exports = router;
