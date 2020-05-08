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
        // console.log("requests", requests);
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
// const requestData = {
//   userFrom: localStorage.getItem("userId"),cb
//   userTo: user._id,62
// };
exports.acceptRequest = async (req, res) => {
  try {
    const options = {
      new: true,
      upsert: true,
      runValidators: true,
    };
    //cb
    User.findById(req.body.userFrom).exec((err, user) => {
      if (err)
        return res
          .status(400)
          .json({ success: "false", err: "User not found" });
      if (user) {
        //cb
        var requests = user.friendRequests;
        var friends = user.friends ? user.friends : [];
        requestRemaining = _.dropWhile(requests, [
          "requestFrom",
          req.body.userTo, //62
        ]);
        // console.log("requestremaining", requestRemaining);
        // console.log("requests", requests);
        var accepted = _.filter(requests, ["requestFrom", req.body.userTo]); //62
        var acceptedForTo = JSON.parse(JSON.stringify(accepted));
        // console.log("acceptedForTo", acceptedForTo);
        // console.log("accepted", accepted);
        acceptedForTo[0].requestFrom = req.body.userFrom; //62->cb
        // console.log("acceptedForTo", acceptedForTo);
        // console.log("accepted", accepted);
        friends = _.concat(friends, accepted);
        // console.log("accepted", accepted);
        User.findByIdAndUpdate(
          req.body.userFrom,
          {
            friendRequests: requestRemaining,
            friends: friends,
          },
          options,
          (err, doc) => {
            if (err)
              return res
                .status(400)
                .json({ success: false, err: "couldnt update" });
            // return res.status(200).json({ success: true, doc: doc });
            if (doc) {
              User.findById(req.body.userTo).exec((err, userTo) => {
                //62
                if (err)
                  return res
                    .status(400)
                    .json({ success: false, err: "User not found" });
                if (userTo) {
                  //62
                  var friendsTo = userTo.friends ? userTo.friends : [];
                  friendsTo = _.concat(friendsTo, acceptedForTo); //cb
                  userTo.friends = friendsTo;
                  userTo.save((err, userTosaved) => {
                    if (err)
                      return res.status(400).json({ success: false, err: err });
                    return res
                      .status(200)
                      .json({ success: true, user: userTosaved });
                  });
                }
              });
            }
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

//@desc unfriend a user (for friends page).
//@route GET /api/users/unfriend
//@access private
exports.unFriend = async (req, res) => {
  try {
    User.findById(req.body.userFrom).exec((err, user) => {
      //62
      if (err)
        return res.status(400).json({ success: false, err: "No user found" });
      if (user) {
        let friends = user.friends;
        friends = _.dropWhile(friends, ["requestFrom", req.body.userTo]); //cb
        user.friends = friends;
        user.save((err, doc) => {
          if (err)
            return res
              .status(400)
              .json({ success: false, err: "UnFriend Error" });
          // return res.status(200).json({ success: true, user: user });
          if (doc) {
            User.findById(req.body.userTo).exec((err, userTo) => {
              //cb
              if (err)
                return res.status(400).json({ success: false, err: err });
              if (userTo) {
                var friendsTo = userTo.friends ? userTo.friends : [];
                friendsTo = _.dropWhile(friendsTo, [
                  "requestFrom",
                  req.body.userFrom,
                ]);
                userTo.friends = friendsTo;
                userTo.save((err, docTo) => {
                  if (err)
                    return res.status(400).json({ success: false, err: err });
                  return res.status(200).json({ success: true, doc: docTo });
                });
              }
            });
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc reject a friend request (for friends page).
//@route GET /api/users/rejectRequest
//@access private
exports.rejectRequest = async (req, res) => {
  try {
    User.findById(req.body.userFrom).exec((err, user) => {
      if (err)
        return res.status(400).json({ success: false, err: "User not found" });
      if (user) {
        let requests = JSON.parse(JSON.stringify(user.friendRequests));
        requests = _.dropWhile(requests, ["requestFrom", req.body.userTo]);
        user.friendRequests = requests;
        user.save((err, doc) => {
          if (err)
            return res
              .status(400)
              .json({ success: false, err: "Could not save" });
          return res.status(200).json({ success: true, doc: doc });
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
