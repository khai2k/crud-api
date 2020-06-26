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
    if (tokken == undefined) console.log("tokenunununu")
    if (tokken) {
      console.log(tokken);
      jwt.verify(tokken, "JWT_SECRET", (err, decode) => {
        if (err) {
          // res.send({ msg: "Token is invalid" })
          return res.send(400);
        }
        req.user = decode;
      })
    }
    else console.log("no token");
    console.log("cuong");
    return next();
  } catch (error) {
    console.log("hao");
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
    console.log("khai");
    res.send(404)
  }

}
export { getToken, isAdmin, isAuth }