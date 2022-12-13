const express = require("express");
const app = express();
const cors = require("cors");

const eventRouter = require("./router/events");
const studentRouter = require("./router/students");
const logRouter = require("./router/logs");
// ^^^^^ routers ^^^^^^^

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
// ^^^^^ utils ^^^^^

const mongoose = require("mongoose");
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("Connected to mongoDB"))
  .catch((err) => logger.error(err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/logs", logRouter);
app.use("/api/students", studentRouter);
app.use("/api/events", eventRouter);
// if (process.env.NODE_ENV === "development") {
//   const testRouter = require("./controllers/tests")
//   app.use("/api/testing", testRouter)
// }
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
