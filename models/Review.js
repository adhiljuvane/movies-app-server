const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: String,
    },
    review: {
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

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
