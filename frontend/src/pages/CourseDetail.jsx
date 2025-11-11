import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        const data = await res.json();
        setCourse(data);

        // quick check: later this should come from backend
        if (data?.enrolled) setIsEnrolled(true);
      } catch (err) {
        console.error("Error loading course", err);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token"); // must be set after login
      await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsEnrolled(true);
    } catch (err) {
      console.error("Enrollment failed", err);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      {!isEnrolled ? (
        <button onClick={handleEnroll}>Enroll</button>
      ) : (
        <p>✅ Already Enrolled</p>
      )}

      {isEnrolled && (
        <div>
          <h3>Lessons</h3>
          <ul>
            {course.content.map((lesson) => (
              <li key={lesson._id}>
                <Link to={`/courses/${course._id}/lesson/${lesson._id}`}>
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
