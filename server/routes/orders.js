import express from 'express';
const router = express.Router();

const orders = [];

router.get('/', (req, res) => {
  res.json({ orders });
});

router.post('/', (req, res) => {
  const order = req.body;
  if (!order || !order.items?.length) {
    return res.status(400).json({ error: 'Order items required' });
  }
  order.id = `${Date.now()}`;
  orders.push(order);
  res.status(201).json({ order });
});

export default router;
