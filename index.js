require("dotenv").config();
const colors = require("colors");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");
//routers
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const multer = require("multer"); // so firstly im gonna create a storage, im gonna indicate this images folder

// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//
app.set("trust-proxy", 1); // since we'll push this upto heroku we also want to implement this app.set
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// storage for multer
// basically this means - its gonna take our file & save it inside images
// And filename will be the name which we're providing
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  },
});
// to upload this file
const upload = multer({ storage: storage });
// post method bec we're uploading something
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  return res.status(200).json("File has been uploaded");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/categories", categoriesRouter);

app.get("/", (req, res) => {
  res.send("app is running");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(`Server is running on port ${PORT}`.yellow.bold)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
