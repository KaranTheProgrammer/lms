// backend/src/controllers/enrollmentController.js

import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// ===============================
// Enroll user in a course
// ===============================
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Prevent duplicate enrollment
    const existing = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });
    if (existing) return res.status(400).json({ message: "Already enrolled" });

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
      progress: [], // store completed lessons here
    });

    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// Get logged-in user’s enrollments
// ===============================
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate("course");
    res.json(enrollments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// ✅ NEW: Mark a lesson complete
// ===============================
export const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    // Find user’s enrollment for this course
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    // Prevent duplicate completion
    if (!enrollment.progress.includes(lessonId)) {
      enrollment.progress.push(lessonId);
      await enrollment.save();
    }

    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
