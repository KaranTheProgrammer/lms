import mongoose from 'mongoose';

export async function connectMongo() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI missing');
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || 'lms' });
  return mongoose.connection;
}