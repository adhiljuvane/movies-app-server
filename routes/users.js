const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getUserById,
  getAll,
  sendRequest,
  acceptRequest,
  unFriend,
  rejectRequest,
  cancelRequest,
  contactMe,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.route("/login").post((req, res) => {
  loginUser(req, res);
});

router.route("/register").post((req, res) => {
  registerUser(req, res);
});

router.get("/logout", auth, (req, res) => {
  logoutUser(req, res);
});

router.get("/auth", auth, (req, res) => {
  getUser(req, res);
});

router.post("/getAll", auth, (req, res) => {
  getAll(req, res);
});

router.post("/user", auth, (req, res) => {
  getUserById(req, res);
});

router.post("/sendRequest", auth, (req, res) => {
  sendRequest(req, res);
});

router.post("/acceptRequest", auth, (req, res) => {
  acceptRequest(req, res);
});

router.post("/unFriend", auth, (req, res) => {
  unFriend(req, res);
});

router.post("/rejectRequest", auth, (req, res) => {
  rejectRequest(req, res);
});

router.post("/cancelRequest", auth, (req, res) => {
  cancelRequest(req, res);
});

router.post("/contactMe", auth, (req, res) => {
  contactMe(req, res);
});

module.exports = router;
