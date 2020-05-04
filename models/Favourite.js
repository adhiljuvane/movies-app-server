const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    movieImage: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

const Favourite = mongoose.model("Favourite", FavouriteSchema);

module.exports = { Favourite };
