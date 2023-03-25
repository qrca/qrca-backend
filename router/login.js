const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");

loginRouter.post("/", (req, res) => {
  const hash = "$2b$10$hEZYu9s4qH3i4SQ.N6N6p.XUBYOGIJZEZolk2cnECxt.8WBFTgIxG";
  // bcrypt.hash("qrca0987", 10).then((result) => {
  //   console.log(result);
  //   res.status(200).json({ result });
  // });
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
