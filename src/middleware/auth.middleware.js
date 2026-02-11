import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    console.log(`[OPT Auth] Token verified for: ${decoded.id} (${decoded.type})`);

    // Check Redis for cached user session with a timeout to prevent hanging on Vercel
    let cachedUser = null;
    try {
        const redisPromise = redisClient.get(`user:${decoded.id}`);
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Redis timeout')), 3000));
        cachedUser = await Promise.race([redisPromise, timeoutPromise]);
    } catch (redisErr) {
        console.warn(`[OPT Auth] Redis unavailable or timed out: ${redisErr.message}. Falling back to JWT.`);
    }
    
    if (cachedUser) {
      console.log(`[Redis] OPT Cache HIT for user: ${decoded.id}`);
      req.user = JSON.parse(cachedUser);
    } else {
      console.log(`[Redis] OPT Cache MISS for user: ${decoded.id} (using JWT fallback)`);
      // Attach basic info from JWT
      req.user = {
        _id: decoded.id,
        id: decoded.id,
        societyId: decoded.societyId,
        type: decoded.type
      };
    }
    
    req.userType = decoded.type;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
        const expiredAt = new Date(err.expiredAt).toISOString();
        console.error(`[OPT Auth] Token EXPIRED at ${expiredAt} for token: ${token.substring(0, 20)}...`);
        return res.status(401).json({ message: "Token expired", expiredAt });
    }
    console.error(`[OPT Auth] JWT Verification FAILED: ${err.message}`);
    res.status(401).json({ message: "Token is not valid" });
  }

};

export default authMiddleware;
