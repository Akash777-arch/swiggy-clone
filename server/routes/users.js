import express from "express";

const router = express.Router();

// In-memory store (replace with a real DB like MongoDB in production)
const users = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    password: "password123", // ⚠ Never store plain text in production — use bcrypt
    phone: "+91 98765 43210",
    avatar: "RS",
    addresses: [
      {
        id: "a1",
        label: "Home",
        address: "102, Sector 26, DLF Phase 1, Gurugram - 122002",
      },
    ],
  },
];

/**
 * POST /api/users/register
 */
router.post("/register", (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }

    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(409).json({ success: false, message: "User with this email already exists." });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // hash in production!
      phone: phone || "",
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      addresses: [],
    };

    users.push(newUser);

    const { password: _, ...safeUser } = newUser;
    res.status(201).json({ success: true, user: safeUser });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/users/login
 */
router.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser, token: `mock_token_${user.id}` });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/users/:id
 */
router.get("/:id", (req, res, next) => {
  try {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (err) {
    next(err);
  }
});

export default router;