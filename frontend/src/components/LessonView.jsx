import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourses, completeLesson } from "../services/api";
import API from "../services/api";

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const allCourses = await getCourses();
      const course = allCourses.find((c) => c._id === courseId);
      if (!course) return;

      const found = course.content.find((l) => l._id === lessonId);
      setLesson(found || null);
    };

    fetchLesson();
  }, [courseId, lessonId]);

  if (!lesson) return <p>Lesson not found</p>;

  const handleComplete = async () => {
    await completeLesson(courseId, lessonId);
    alert("✅ Lesson marked complete!");
  };

  const handleAnswerChange = (qIndex, option) => {
    setQuizAnswers({ ...quizAnswers, [qIndex]: option });
  };

  const handleSubmitQuiz = async () => {
    try {
      const res = await API.post(`/enrollments/${courseId}/lesson/${lessonId}/quiz`, {
        answers: quizAnswers,
      });
      setQuizResult(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Quiz submission failed");
    }
  };

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>

      {lesson.videoUrl && (
        <div>
          <a href={lesson.videoUrl} target="_blank" rel="noreferrer">
            📺 Watch Video
          </a>
        </div>
      )}

      <button onClick={handleComplete}>✅ Mark Complete</button>

      {lesson.quiz && lesson.quiz.length > 0 && (
        <div>
          <h3>Quiz</h3>
          {lesson.quiz.map((q, i) => (
            <div key={i}>
              <p>{q.question}</p>
              {q.options.map((opt, idx) => (
                <label key={idx} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    onChange={() => handleAnswerChange(i, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmitQuiz}>🚀 Submit Quiz</button>
        </div>
      )}

      {quizResult && (
        <div>
          <h3>Quiz Results</h3>
          <p>
            Score: {quizResult.score}% ({quizResult.correct} / {quizResult.total})
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonView;
