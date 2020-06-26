import jwt from 'jsonwebtoken';

const getToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }, "JWT_SECRET", {
    expiresIn: '48h'
  })
}
const isAuth = (req, res, next) => {
  try {
    const tokken = req.headers.authorization;
    if (tokken) {
      jwt.verify(tokken, "JWT_SECRET", (err, decode) => {
        if (err) {
          // res.send({ msg: "Token is invalid" })
          return res.send(400);
        }
        req.user = decode;
      })
    }
    else console.log("no token");
    return next();
  } catch (error) {
    res.send(400)
  }

}
const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.send(404);
  } catch (error) {
    res.send(404)
  }

}
export { getToken, isAdmin, isAuth }