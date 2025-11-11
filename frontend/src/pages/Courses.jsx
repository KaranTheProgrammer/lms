import React from "react";
import "../styles/Auth.css";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      description: "Learn React step by step with hands-on projects.",
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      description: "Master the fundamentals of modern JavaScript.",
    },
    {
      id: 3,
      title: "Node.js & Express",
      description: "Build scalable backend APIs with Node.js and Express.",
    },
  ];

  return (
    <div className="courses-wrapper">
      <h2 className="dashboard-title">Available Courses</h2>
      <hr />
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-desc">{course.description}</p>
            <button className="course-btn">Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
