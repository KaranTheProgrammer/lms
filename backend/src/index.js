import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { ensureSqliteMigrations } from './db/sqlite.js';
import { connectMongo } from './db/mongo.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;
const PROVIDER = (process.env.DB_PROVIDER || 'sqlite').toLowerCase();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ ok: true, provider: PROVIDER });
});

app.use('/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

(async () => {
  try {
    if (PROVIDER === 'sqlite') {
      await ensureSqliteMigrations();
    } else if (PROVIDER === 'mongo') {
      await connectMongo();
    }
    app.listen(PORT, () =>
      console.log(`API on http://localhost:${PORT} (DB: ${PROVIDER})`)
    );
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})();