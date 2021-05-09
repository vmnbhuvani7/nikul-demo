import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(401).send({ message : "Invalid token." })
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({ message : "Token is required!" })
  }
};

export { auth };