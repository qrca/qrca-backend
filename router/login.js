const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");

loginRouter.post("/", (req, res) => {
  /**
   * Used for logging in the app
   * @router
   * Note: `The hash is on the server. It won't be leaked since it's not being sent out as a payload.
   *        ON THE CASE THAT IT IS LEAKED, assume that someone has shared the source code.`
   */
  const hash = "$2b$10$hEZYu9s4qH3i4SQ.N6N6p.XUBYOGIJZEZolk2cnECxt.8WBFTgIxG";
  bcrypt.compare(req.body.password, hash).then((result) => {
    console.log(result);
    if (result) {
      res.status(200).json({ result });
    } else {
      res.status(401).json({ result, message: "Invalid Credentials" });
    }
  });
});

module.exports = loginRouter;
