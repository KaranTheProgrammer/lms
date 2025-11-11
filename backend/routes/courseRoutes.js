import express from 'express';
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from '../controllers/courseController.js';

const router = express.Router();

// Create course
router.post('/', createCourse);

// Get all courses
router.get('/', getCourses);

// Get course by ID
router.get('/:id', getCourseById);

// Update course
router.put('/:id', updateCourse);

// Delete course
router.delete('/:id', deleteCourse);

export default router;
