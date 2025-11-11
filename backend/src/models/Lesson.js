import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  pptUrl: { type: String }, // ✅ file URL (PowerPoint/PDF)
  quiz: [
    {
      question: String,
      options: [String],
      answer: Number,
    },
  ],
});

export default lessonSchema;
