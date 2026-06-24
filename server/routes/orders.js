import express from "express";

const router = express.Router();

// In-memory order store (replace with DB in production)
const orders = [];

/**
 * POST /api/orders
 * Place a new order
 */
router.post("/", (req, res, next) => {
  try {
    const { userId, items, restaurantId, restaurantName, address, paymentMethod, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }
    if (!address) {
      return res.status(400).json({ success: false, message: "Delivery address is required." });
    }

    const order = {
      id: `ORD-${Date.now()}`,
      userId: userId || "guest",
      items,
      restaurantId,
      restaurantName,
      address,
      paymentMethod: paymentMethod || "cod",
      totalAmount,
      status: "placed",
      estimatedDelivery: "30-35 mins",
      createdAt: new Date().toISOString(),
      timeline: [
        { status: "placed",    label: "Order Placed",    time: new Date().toISOString() },
        { status: "preparing", label: "Preparing Food",  time: null },
        { status: "on_way",    label: "Out for Delivery", time: null },
        { status: "delivered", label: "Delivered",       time: null },
      ],
    };

    orders.push(order);

    // Simulate status progression (in real app, this would be webhook/socket)
    setTimeout(() => {
      const o = orders.find((o) => o.id === order.id);
      if (o) {
        o.status = "preparing";
        o.timeline[1].time = new Date().toISOString();
      }
    }, 5000);

    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/:id
 * Get a single order by ID
 */
router.get("/:id", (req, res, next) => {
  try {
    const order = orders.find((o) => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/user/:userId
 * Get all orders for a user
 */
router.get("/user/:userId", (req, res, next) => {
  try {
    const userOrders = orders
      .filter((o) => o.userId === req.params.userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, orders: userOrders, count: userOrders.length });
  } catch (err) {
    next(err);
  }
});

export default router;