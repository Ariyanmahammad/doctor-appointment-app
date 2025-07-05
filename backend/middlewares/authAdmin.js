import jwt from "jsonwebtoken";

//admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    // 🔥 FIXED: Use lowercase `atoken` to match header name
    const token = req.headers.atoken;

    console.log("Incoming headers:", req.headers);
    console.log("Received token:", token);

    if (!token) {
      console.log("❌ No token received");
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      console.log("❌ Token content mismatch");
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    console.log("✅ Auth successful");
    next();
  } catch (error) {
    console.log("❌ JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized - JWT Error" });
  }
};

export default authAdmin;
