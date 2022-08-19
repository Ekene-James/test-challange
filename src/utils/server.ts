import express from "express";
import routes from "../routes";
import rateLimit from "express-rate-limit";

function createServer() {
  const app = express();

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `window` (here, per minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  app.use(express.json());
  app.use(limiter);

  routes(app);

  return app;
}

export default createServer;
