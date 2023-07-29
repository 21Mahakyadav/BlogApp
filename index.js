const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const mongoose = require("mongoose");
//const formidable = require("formidable");
const multer=require("multer");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute=require("./routes/posts");
const categoryRoute=require("./routes/categories");
const path=require("path");
app.use("/images", express.static(path.join(__dirname, "/images")));
try {
  mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });
  console.log("mongoose is connected");
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute); // Corrected route path
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
const port=process.env.port || 5173;

app.listen(port, () => {
  console.log("backend is running");
});









