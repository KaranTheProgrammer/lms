// 📂 frontend/src/pages/CoursePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { enrollCourse } from "../services/api";
import "../styles/Auth.css";

const CoursePage = () => {
  const { id } = useParams(); // get course id from URL
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    // temporary hardcoded course data (later replace with API fetch)
    const mockCourses = [
      { _id: "1", title: "React for Beginners", description: "Learn React step by step" },
      { _id: "2", title: "Advanced JavaScript", description: "Deep dive into JS" },
    ];
    const found = mockCourses.find((c) => c._id === id);
    setCourse(found || null);
  }, [id]);

  const handleEnroll = async () => {
    if (!course) return;
    try {
      await enrollCourse(course._id);
      alert("Enrolled successfully!");
      setEnrolled(true);
    } catch (err) {
      alert("Already enrolled or error");
    }
  };

  if (!course) {
    return (
      <div className="course-wrapper">
        <div className="course-card">
          <h2 className="course-title">Course not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="course-wrapper">
      <div className="course-card">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-desc">{course.description}</p>

        {!enrolled ? (
          <button className="auth-btn" onClick={handleEnroll}>
            Enroll in Course
          </button>
        ) : (
          <div className="course-content">
            <h3>📖 Course Content</h3>
            <p>Your learning materials will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
