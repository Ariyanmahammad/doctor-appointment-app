import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const dToken = authHeader.split(" ")[1];
    const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);

    req.docId = token_decode.id;
    next();

    console.log("✅ Auth successful");
  } catch (error) {
    console.log("❌ JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized - JWT Error" });
  }
};

export default authDoctor;
