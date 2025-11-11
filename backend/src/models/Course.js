import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true }, // ✅ correct answer
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String },
  quiz: [quizSchema], // ✅ add quiz per lesson
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String },
    content: [lessonSchema], // ✅ lessons array with quizzes
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
