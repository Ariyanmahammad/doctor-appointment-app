import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = token_decode.id; // ✅ safer than putting in req.body
    next();

    console.log("✅ Auth successful");
  } catch (error) {
    console.log("❌ JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized - JWT Error" });
  }
};

export default authUser;

//9.50.44 hr
