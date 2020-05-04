const express = require("express");
const router = express.Router();
const {
  getFavouriteNumber,
  getFavourited,
  addToFavourites,
  removeFromFavourites,
  getFavouriteMovies,
} = require("../controllers/favourites");
const { auth } = require("../middlewares/auth");

router.post("/favourited", auth, (req, res) => {
  getFavourited(req, res);
});

router.post("/favouriteNumber", auth, (req, res) => {
  getFavouriteNumber(req, res);
});

router.post("/addToFavourite", auth, (req, res) => {
  addToFavourites(req, res);
});

router.post("/removeFromFavourite", auth, (req, res) => {
  removeFromFavourites(req, res);
});

router.post("/getFavouriteMovies", auth, (req, res) => {
  getFavouriteMovies(req, res);
});

module.exports = router;
