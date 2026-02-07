import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Check Redis for cached user session
    const cachedUser = await redisClient.get(`user:${decoded.id}`);
    
    if (cachedUser) {
      console.log(`[Redis] Cache HIT for user: ${decoded.id}`);
      req.user = JSON.parse(cachedUser);
    } else {
      console.log(`[Redis] Cache MISS for user: ${decoded.id} (using JWT)`);
      req.user = decoded;
    }
    
    req.userType = decoded.type;
    
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }

};

export default authMiddleware;
