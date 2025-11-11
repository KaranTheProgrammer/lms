// 📂 frontend/src/pages/CourseCatalog.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Handle enroll
  const handleEnroll = async (courseId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/enroll/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.error("Failed to enroll");
      }
    } catch (err) {
      console.error("Error enrolling:", err);
    }
  };

  if (loading) {
    return <div className="courses-wrapper"><p>Loading courses...</p></div>;
  }

  return (
    <div className="courses-wrapper">
      <h2 className="dashboard-title">Available Courses</h2>
      <hr />
      <div className="course-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-desc">{course.description}</p>
            <button
              className="course-btn"
              onClick={() => handleEnroll(course._id)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
