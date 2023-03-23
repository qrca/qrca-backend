const express = require("express");
const app = express();
const cors = require("cors");

const eventRouter = require("./router/events");
const studentRouter = require("./router/students");
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
  .then(() => logger.debug("Connected to mongoDB"))
  .catch((err) => logger.error(err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/students", studentRouter);
app.use("/api/events", eventRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
