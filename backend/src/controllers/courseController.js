import db from '../db/sqlite.js';

// Create a new course (admin only)
export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    
    // Simple validation
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Insert the new course
    const stmt = db.prepare('INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)');
    const result = stmt.run(title, description, instructor);
    
    // Get the newly created course
    const newCourse = db.prepare('SELECT * FROM courses WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = db.prepare('SELECT * FROM courses').all();
    res.json(courses || []);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

// Get a single course by ID
export const getCourse = async (req, res) => {
  try {
    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
};
