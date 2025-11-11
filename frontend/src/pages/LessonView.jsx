import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // fetch one course
        const res = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        const course = await res.json();

        // find the lesson inside the course
        const found = course?.content?.find((l) => l._id === lessonId);

        // ✅ fallback: if lesson has no slides, add dummy slides for testing
        if (found && !found.slides) {
          found.slides = [
            "https://via.placeholder.com/600x400.png?text=Slide+1",
            "https://via.placeholder.com/600x400.png?text=Slide+2",
            "https://via.placeholder.com/600x400.png?text=Slide+3",
          ];
        }

        setLesson(found);
      } catch (err) {
        console.error("Error loading lesson", err);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

  const handleNextSlide = () => {
    if (lesson?.slides && currentSlide < lesson.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    lesson.quiz.forEach((q, idx) => {
      const selected = e.target[`q${idx}`].value;
      if (parseInt(selected) === parseInt(q.answer)) score += 1;
    });
    const percent = (score / lesson.quiz.length) * 100;
    setQuizScore(percent);

    if (percent >= 70) {
      fetchCertificate();
    }
  };

  const fetchCertificate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/certificates/${courseId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "certificate.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      console.error("Certificate error", err);
    }
  };

  if (!lesson) return <p>Loading...</p>;

  return (
    <div>
      <h2>{lesson.title}</h2>

      {!isComplete ? (
        <div>
          {lesson.slides && lesson.slides.length > 0 ? (
            <>
              <img
                src={lesson.slides[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                style={{ maxWidth: "600px", display: "block" }}
              />
              <button onClick={handleNextSlide}>
                {currentSlide === lesson.slides.length - 1
                  ? "Finish Lesson"
                  : "Next Slide"}
              </button>
            </>
          ) : (
            <button onClick={() => setIsComplete(true)}>✅ Mark Complete</button>
          )}
        </div>
      ) : (
        <div>
          {!quizVisible ? (
            <button onClick={() => setQuizVisible(true)}>Start Quiz</button>
          ) : (
            <form onSubmit={handleQuizSubmit}>
              {lesson.quiz.map((q, idx) => (
                <div key={idx}>
                  <p>{q.question}</p>
                  {q.options.map((opt, i) => (
                    <label key={i}>
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={i}
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}
              <button type="submit">Submit Quiz</button>
            </form>
          )}
        </div>
      )}

      {quizScore !== null && (
        <p>
          Your score: {quizScore}%
          {quizScore >= 70 ? " 🎉 Certificate earned!" : " ❌ Try again."}
        </p>
      )}
    </div>
  );
};

export default LessonView;
