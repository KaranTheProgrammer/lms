import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: data.id, role: data.role, username: data.username };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthenticated' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    return next();
  };
}