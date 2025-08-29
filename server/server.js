const express = require("express");

const path = require("path");

const bodyParser = require('body-parser');

const cors = require("cors");

const connectDB = require('./config/db');

const app = express();

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

const customerPath = require("./routes/customerRoute");

const authPath = require("./routes/authRoute");

const usersPath = require("./routes/userRoute");

const categoryPath = require("./routes/categoryRoute");

const postPath = require("./routes/postRoute");

const commentPath = require("./routes/commentRoute");

const { errorHandling, notFound } = require("./middlewares/errorHandling");

/*===========================================*/
/*===========================================*/
/*===========================================*/

connectDB();

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '1000mb',
  extended: true
}));

/*===========================================*/

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/*===========================================*/

const corsOptions = {
  origin: [
    "http://localhost:3000", // local React   
    "https://frontend-first-blog.vercel.app" // production frontend
  ],
  credentials: true
};

app.use(cors(corsOptions));

/*===========================================*/

app.use(express.json());

// app.use('/images', express.static('./uploads'))

app.use("/api/customer", customerPath);

app.use("/api/auth", authPath);

app.use("/api/users", usersPath);

app.use("/api/categories", categoryPath);

app.use("/api/post", postPath);

app.use("/api/comment", commentPath);

// Error Hanlder Middleware
app.use(notFound);

app.use(errorHandling);

app.listen(PORT, () => {

  console.log(`the server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)

}); 