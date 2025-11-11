import bcrypt from 'bcrypt';

const PROVIDER = (process.env.DB_PROVIDER || 'sqlite').toLowerCase();

let store;

if (PROVIDER === 'mongo') {
  const mongoose = (await import('mongoose')).default;
  const UserSchema = new mongoose.Schema(
    {
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      role: { type: String, required: true, enum: ['superadmin','instructor','learner'] }
    },
    { timestamps: true }
  );
  const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

  store = {
    async findByUsername(username) {
      return await UserModel.findOne({ username });
    },
    async createUser({ username, passwordHash, role }) {
      const doc = await UserModel.create({ username, password: passwordHash, role });
      return { id: String(doc._id), username: doc.username, role: doc.role, password: doc.password };
    }
  };
} else {
  const { default: db } = await import('../db/sqlite.js');
  store = {
    async findByUsername(username) {
      return db.prepare('SELECT * FROM users WHERE username = ?').get(username) || null;
    },
    async createUser({ username, passwordHash, role }) {
      const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
      stmt.run(username, passwordHash, role);
      const row = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
      return row;
    }
  };
}

export async function verifyPassword(plain, hash) {
  return await bcrypt.compare(plain, hash);
}

export async function hashPassword(plain) {
  return await bcrypt.hash(plain, 10);
}

export default store;