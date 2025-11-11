import express from "express";
import Course from "../models/Course.js";
import { createCourse, getCourses, getCourse } from '../controllers/courseController.js';
import { verifyJWT, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Routes for courses
router.get('/', verifyJWT, getCourses);
router.post('/', verifyJWT, requireRole('instructor', 'superadmin'), createCourse);
router.get('/:id', verifyJWT, getCourse);

// Add a lesson to a course
router.post('/:courseId/lessons', verifyJWT, requireRole('instructor', 'superadmin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const newLesson = {
      title: req.body.title,
      content: req.body.content,
      pptUrl: req.body.pptUrl || '',
      quiz: req.body.quiz || []
    };

    course.content.push(newLesson);
    await course.save();
    
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all lessons for a course
router.get('/:courseId/lessons', verifyJWT, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course.content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific lesson from a course
router.get('/:courseId/lessons/:lessonId', verifyJWT, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    const lesson = course.content.id(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit Quiz for a lesson
router.post('/:courseId/lessons/:lessonId/quiz', verifyJWT, async (req, res) => {
  try {
    const { answers } = req.body;
    const { courseId, lessonId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lesson = course.content.id(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    if (!lesson.quiz || lesson.quiz.length === 0) {
      return res.status(400).json({ message: "No quiz available for this lesson" });
    }

    let score = 0;
    lesson.quiz.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    // Calculate percentage
    const percentage = (score / lesson.quiz.length) * 100;
    
    // Update user's progress (you'll need to implement this part)
    // For now, just return the score
    res.json({
      score: `${score}/${lesson.quiz.length}`,
      percentage: `${percentage.toFixed(2)}%`,
      passed: percentage >= 80 // Assuming 80% is passing
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
