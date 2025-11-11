import express from 'express';
import { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } from '../controllers/quizController.js';

const router = express.Router();

// Create quiz
router.post('/', createQuiz);

// Get all quizzes
router.get('/', getQuizzes);

// Get quiz by ID
router.get('/:id', getQuizById);

// Update quiz
router.put('/:id', updateQuiz);

// Delete quiz
router.delete('/:id', deleteQuiz);

export default router;
