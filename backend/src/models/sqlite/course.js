import db from '../db/sqlite.js';

// Create courses table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    instructor TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER,
    question TEXT NOT NULL,
    options TEXT NOT NULL, -- JSON array of options
    answer TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
  )`);
});

// Course model methods
const Course = {
  // Create a new course
  async create({ title, description, instructor }) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)',
        [title, description, instructor],
        function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  // Get all courses
  async findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM courses', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows || []);
      });
    });
  },

  // Get a single course by ID
  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      });
    });
  },

  // Add a lesson to a course
  async addLesson(courseId, { title, description, videoUrl }) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO lessons (course_id, title, description, video_url) VALUES (?, ?, ?, ?)',
        [courseId, title, description, videoUrl],
        function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  // Get all lessons for a course
  async getLessons(courseId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM lessons WHERE course_id = ? ORDER BY created_at',
        [courseId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows || []);
        }
      );
    });
  }
};

export default Course;
