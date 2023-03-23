const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const NODE_ENV = process.env.NODE_ENV;

try {
  const PORT = config.PORT || 3003;
  const server = http.createServer(app);

  server.listen(PORT, () => {
    logger.info(`Server listening on localhost:${PORT} in ${NODE_ENV} mode.`);
  });
} catch (error) {
  logger.error(error);
}
