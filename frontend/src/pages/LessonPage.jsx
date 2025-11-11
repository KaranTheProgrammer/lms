import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        console.log("Fetched course:", data); // 🟢 Debug log
        const found = data.lessons.find(l => l._id === lessonId);
        setLesson(found);
      } catch (err) {
        console.error("Error fetching lesson:", err);
      }
    };
    fetchLesson();
  }, [courseId, lessonId]);
console.log("Course ID:", courseId);
console.log("Lesson ID from URL:", lessonId);
  if (!lesson) return <p>🔎 Lesson not found or still loading...</p>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
    </div>
  );
};

export default LessonPage;
