import rateLimit from "../config/upstash.js";

const rateLimiter = async (_, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (err) {
    console.log("Rate limit error ", err);
    next(err)
  }
};

export default rateLimiter;
