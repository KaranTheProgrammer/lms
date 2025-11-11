import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import PDFDocument from "pdfkit";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

const router = express.Router();

// ======================
// Generate Certificate
// ======================
router.get("/:courseId", protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId,
    });

    if (!enrollment) return res.status(404).json({ message: "Not enrolled" });

    const course = await Course.findById(req.params.courseId);

    // ✅ Check if all lessons completed & passed
    const lessonsCompleted = enrollment.progress.length;
    const totalLessons = course.content.length;
    const passed = enrollment.progress.every((p) => p.score >= 70);

    if (lessonsCompleted < totalLessons || !passed) {
      return res.status(400).json({ message: "Course not completed or quiz not passed" });
    }

    // ✅ Generate PDF Certificate
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=certificate.pdf`);

    doc.fontSize(24).text("Certificate of Completion", { align: "center" });
    doc.moveDown();
    doc.fontSize(18).text(`This certifies that ${req.user.name}`);
    doc.text(`has successfully completed the course: ${course.title}`);
    doc.moveDown();
    doc.text("Issued on: " + new Date().toLocaleDateString(), { align: "right" });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
