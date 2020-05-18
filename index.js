const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

var whitelist = [
  "http://localhost:3000",
  "https://carpe-diem-movies.surge.sh",
  "https://warm-wildwood-35115.herokuapp.com",
];

const corsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: true,
  preflightContinue: false,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/", express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.use("/api/users", require("./routes/users"));
app.use("/api/favourite", require("./routes/favourites"));
app.use("/api/reviews", require("./routes/reviews"));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

app.listen(PORT, () => {
  console.log("Server running on PORT 5000");
});
