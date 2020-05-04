const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

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
  origin: "http://localhost:3000",
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

app.use("/api/users", require("./routes/users"));
app.use("/api/favourite", require("./routes/favourites"));
app.use("/api/reviews", require("./routes/reviews"));

app.get("/", (req, res) => {
  res.status(200).send("<h3>Hello there!!</h3>");
});

app.listen(PORT, () => {
  console.log("Server running on PORT 5000");
});
