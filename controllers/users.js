const { User } = require("../models/User");
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");
const saltRounds = 10;
var _ = require("lodash");

//@desc to get details of the user.
//@route GET /api/users/auth
//access private
exports.getUser = (req, res) => {
  try {
    return res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

//@desc register a user on signup.
//@route POST /api/users/register
//access public
exports.registerUser = async (req, res) => {
  try {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) return next(err);
        req.password = hash;
      });
    });

    const user = await User.create(req.body);

    user.save((err, doc) => {
      if (err) return res.json({ success: false, error: err });
      return res.status(201).json({
        success: true,
        data: doc,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

//@desc when user login.
//@route POST /api/users/login
//@access public
exports.loginUser = async (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          success: false,
          error: "Email not found",
        });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({ loginSuccess: false, message: "Passwords dont" });
        }

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("w_authExp", user.tokenExp);
          res.cookie("w_auth", user.token);
          res.status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc when user logout.
//@route GET /api/users/logout
//@access private
exports.logoutUser = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "", tokenExp: "" },
      (err, doc) => {
        if (err) return res.json({ success: false, error: err });
        return res.status(200).json({
          success: true,
          data: doc,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc get anther user by id.
//@route post /api/users/user
//@access private
exports.getUserById = async (req, res) => {
  try {
    User.findById(req.body.id).exec((err, user) => {
      if (err) return res.status(400).json({ success: false, err: err });
      return res.status(200).json({ success: true, user: user });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc get all users (for friends page).
//@route GET /api/users/getAll
//@access private
exports.getAll = async (req, res) => {
  try {
    User.find({ _id: { $ne: req.body.id } }).exec((err, users) => {
      if (err) return res.status(400).json({ success: false, err: err });
      return res.status(200).json({ success: true, users: users });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc send request (for friends page).
//@route POST /api/users/sendRequest
//@access private
//all done.
exports.sendRequest = async (req, res) => {
  const options = {
    new: true,
    upsert: true,
    runValidators: true,
  };
  var doc1 = {};

  //adding request to friendRequests in To user
  await User.findByIdAndUpdate(
    req.body.userTo,
    { $addToSet: { friendRequests: { user: req.body.userFrom } } },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      doc1 = doc;
    }
  );

  //adding request in pendingRequests in From user
  User.findByIdAndUpdate(
    req.body.userFrom,
    {
      $addToSet: { pendingRequests: { user: req.body.userTo } },
    },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      return res.status(200).json({ success: true, doc1: doc1, doc2: doc });
    }
  );
};

//@desc accept friend request (for friends page).
//@route POST /api/users/acceptRequest
//@access private
// const requestData = {
//   userFrom: localStorage.getItem("userId"),cb
//   userTo: user._id,62
// };
//done
exports.acceptRequest = async (req, res) => {
  const options = {
    new: true,
    upsert: true,
    runValidators: true,
  };

  // var userFrom = mongoose.mongo.ObjectID(req.body.userFrom);
  // var userTo = mongoose.mongo.ObjectID(req.body.userTo);

  //moving user from friendRequests to friends of userFrom

  await User.findByIdAndUpdate(
    req.body.userFrom,
    {
      $pull: {
        friendRequests: { user: req.body.userTo },
      },
      $addToSet: { friends: { user: req.body.userTo } },
    },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      console.log("doc", doc);
    }
  );

  //moving user from pendongRequests to friends of userTo
  User.findByIdAndUpdate(
    req.body.userTo,
    {
      $pull: {
        pendingRequests: { user: req.body.userFrom },
      },
      $addToSet: { friends: { user: req.body.userFrom } },
    },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      return res.status(200).json({ success: true, doc: doc });
    }
  );
};

//@desc unfriend a user (for friends page).
//@route GET /api/users/unfriend
//@access private
// const unFriend = (user) => {
//   const data = {
//     userFrom: localStorage.getItem("userId"),
//     userTo: user._id,
//   };
//done
exports.unFriend = async (req, res) => {
  const options = {
    new: true,
    upsert: true,
    runValidators: true,
  };

  var doc1 = {};

  User.findOneAndUpdate(
    req.body.userFrom,
    { $pull: { friends: { user: req.body.userTo } } },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      doc1 = doc;
    }
  );

  User.findByIdAndUpdate(
    req.body.userTo,
    { $pull: { friends: { user: req.body.userFrom } } },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      return res.status(200).json({ success: true, doc1: doc1, doc2: doc });
    }
  );
};

//@desc reject a friend request (for friends page).
//@route GET /api/users/rejectRequest
//@access private
//done
exports.rejectRequest = async (req, res) => {
  const options = {
    new: true,
    upsert: true,
    runValidators: true,
  };

  var doc1 = {};
  //Removing request from friendRequests of userFrom

  await User.findByIdAndUpdate(
    req.body.userFrom,
    { $pull: { friendRequests: { user: req.body.userTo } } },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      doc1 = doc;
    }
  );

  //Removing request from pendingRequests of userTo

  User.findByIdAndUpdate(
    req.body.userTo,
    { $pull: { pendingRequests: { user: req.body.userFrom } } },
    options,
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err: err });
      return res.status(200).json({ success: true, doc1: doc1, doc2: doc });
    }
  );
};
