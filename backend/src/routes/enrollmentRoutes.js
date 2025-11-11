import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
  enrollInCourse, 
  getEnrollments, 
  getEnrollment,
  completeLesson 
} from "../controllers/enrollmentController.js";

const router = express.Router();

// ✅ Enroll in a course
router.post("/:courseId", protect, enrollInCourse);

// ✅ Get all enrollments for logged-in user
router.get("/", protect, getEnrollments);

// ✅ Get single enrollment
router.get("/:id", protect, getEnrollment);

// ✅ Mark a lesson as complete
router.patch("/:enrollmentId/complete-lesson", protect, completeLesson);

export default router;
