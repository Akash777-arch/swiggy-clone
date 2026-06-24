import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'User routes available' });
});

router.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }
  res.json({ user: { id: 'guest', name: username } });
});

export default router;
