import mongoose from 'mongoose';
import User from './models/User.js';
import Course from './models/Course.js';

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const admin = new User({
    username: 'admin',
    password: 'admin123',
    role: 'superadmin'
  });

  const instructor = new User({
    username: 'instructor',
    password: 'instructor123',
    role: 'instructor'
  });

  const learner = new User({
    username: 'learner',
    password: 'learner123',
    role: 'learner'
  });

  await admin.save();
  await instructor.save();
  await learner.save();

  const sampleCourse = new Course({
    title: 'Health & Safety Training',
    description: 'Compliance training for health and safety regulations.',
    media: [],
  });

  await sampleCourse.save();

  console.log('Seed data created.');
  mongoose.connection.close();
};

seedData();
