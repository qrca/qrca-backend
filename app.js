const express = require("express");
const app = express();
const cors = require("cors");
// const blogRouter = require("./controllers/blogs");
// const userRouter = require("./controllers/users");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
// const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info("Connected to mongoDB"))
  .catch((err) => logger.error(err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

// app.use("/api/blogs", middleware.userExtractor, blogRouter);
// app.use("/api/users", userRouter);
// app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "development") {
  const testRouter = require("./controllers/tests");
  app.use("/api/testing", testRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
