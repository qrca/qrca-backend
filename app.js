const express = require("express");
const app = express();
const cors = require("cors");

const eventRouter = require("./router/events");
const studentRouter = require("./router/students");
const loginRouter = require("./router/login");
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

/**
 * To access the API, try performing the defined HTTP requests on the URIs. For example, invoke `curl http://localhost:{PORT}/api/students` to get the list of students`
 * @routerSetup
 */

app.use("/api/students", studentRouter);
app.use("/api/events", eventRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
