import jwt from 'jsonwebtoken';
import userStore, { hashPassword, verifyPassword } from '../models/userStore.js';
import { connectMongo } from '../db/mongo.js'; // Ensure this is correct
import { ensureSqliteMigrations } from '../db/sqlite.js'; // Ensure this is correct

function sign(user) {
  return jwt.sign(
    { id: user.id || user._id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
}

export async function registerUser(req, res) {
  try {
    const { username, password, role = 'learner' } = req.body; // Extract variables
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const existingUser = await userStore.findByUsername(username); // Check for existing user
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await hashPassword(password);
    const created = await userStore.createUser({ username, passwordHash: hashedPassword, role });
    const token = sign(created);
    return res.status(201).json({ token, user: { id: created.id || created._id, username, role } });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ message: err.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body; // Change to username
    const user = await userStore.findByUsername(username);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const ok = await verifyPassword(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = sign(user);
    return res.json({ token, user: { id: user.id || user._id, username: user.username, role: user.role } });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: err.message });
  }
}

export function me(req, res) {
  return res.json({ user: req.user });
}