const { User } = require("../models/User");
const bcrypt = require("bcrypt");
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
exports.sendRequest = async (req, res) => {
  try {
    const options = {
      new: true,
      upsert: true,
      runValidators: true,
    };

    User.findById(req.body.userTo).exec((err, user) => {
      if (err)
        return res.status(400).json({ success: false, err: "User not found" });
      if (user) {
        let requests = user.friendRequests ? user.friendRequests : [];
        const request = {
          requestFrom: req.body.userFrom,
          time: req.body.time,
        };
        requests = [...requests, request];
        console.log("requests", requests);
        User.findByIdAndUpdate(
          req.body.userTo,
          { friendRequests: requests },
          options,
          (err, doc) => {
            if (err)
              return res
                .status(400)
                .json({ success: false, err: "couldnt update" });
            return res.status(200).json({ success: true, doc: doc });
          }
        );
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

//@desc accept friend request (for friends page).
//@route POST /api/users/acceptRequest
//@access private
exports.acceptRequest = async (req, res) => {
  try {
    const options = {
      new: true,
      upsert: true,
      runValidators: true,
    };

    User.findById(req.body.userFrom).exec((err, user) => {
      if (err)
        return res
          .status(400)
          .json({ success: "false", err: "User not found" });
      if (user) {
        var requests = user.friendRequests;
        var accepted = user.friends ? user.friends : [];
        requestRemaining = _.dropWhile(requests, [
          "requestFrom",
          req.body.userTo,
        ]);
        // console.log("requestremaining", requestRemaining);
        // console.log("requests", requests);
        accepted = _.filter(requests, ["requestFrom", req.body.userTo]);
        // console.log("accepted", accepted);
        User.findByIdAndUpdate(
          req.body.userFrom,
          {
            friendRequests: requestRemaining,
            friends: accepted,
          },
          options,
          (err, doc) => {
            if (err)
              return res
                .status(400)
                .json({ success: false, err: "couldnt update" });
            return res.status(200).json({ success: true, doc: doc });
          }
        );
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
