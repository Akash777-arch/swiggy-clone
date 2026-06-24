import express from "express";
import cors from "cors";
import config from "./config/index.js";
import errorHandler, { notFound } from "./middleware/errorHandler.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger (dev only)
if (config.nodeEnv === "development") {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    status: "ok",
    env: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// ── Restaurants (mock data — replace with DB in production) ───────────────────
app.get("/api/restaurants", (_req, res) => {
  res.json({
    success: true,
    restaurants: [
      { id: "r1", name: "Domino's Pizza",   rating: 4.3, deliveryTime: 25, cuisines: ["Pizza", "Pasta", "Desserts"] },
      { id: "r2", name: "Burger King",       rating: 4.1, deliveryTime: 20, cuisines: ["Burgers", "Beverages"] },
      { id: "r3", name: "Paradise Biryani",  rating: 4.5, deliveryTime: 35, cuisines: ["Biryani", "North Indian"] },
      { id: "r4", name: "Chinese Wok",       rating: 3.9, deliveryTime: 30, cuisines: ["Chinese", "Asian"] },
      { id: "r5", name: "McDonald's",        rating: 4.2, deliveryTime: 22, cuisines: ["Burgers", "Fast Food"] },
      { id: "r6", name: "Haldiram's",        rating: 4.4, deliveryTime: 40, cuisines: ["North Indian", "Sweets"] },
      { id: "r7", name: "Wow! Momo",         rating: 4.0, deliveryTime: 28, cuisines: ["Chinese", "Rolls"] },
      { id: "r8", name: "Barbeque Nation",   rating: 4.6, deliveryTime: 45, cuisines: ["North Indian", "Kebabs"] },
      { id: "r9", name: "Subway",            rating: 3.8, deliveryTime: 20, cuisines: ["Sandwich", "Healthy Food"] },
      { id: "r10", name: "Sushi Garden",     rating: 4.3, deliveryTime: 35, cuisines: ["Sushi", "Japanese"] },
      { id: "r11", name: "Amul Ice Cream",   rating: 4.1, deliveryTime: 18, cuisines: ["Desserts", "Ice Cream"] },
      { id: "r12", name: "Saravana Bhavan",  rating: 4.5, deliveryTime: 30, cuisines: ["South Indian", "Thali"] },
    ],
  });
});

// ── 404 & Error handlers (must be last) ──────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`
  ┌─────────────────────────────────────────┐
  │   🍕  Swiggy Clone Server Running       │
  │   Port  : ${config.port}                        │
  │   Env   : ${config.nodeEnv}              │
  │   Client: ${config.clientUrl}   │
  └─────────────────────────────────────────┘
  `);
});

export default app;