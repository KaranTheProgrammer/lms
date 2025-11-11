// 📂 frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getEnrollments } from "../services/api";
import "../styles/Auth.css"; // ✅ reuse same styling foundation

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEnrollments();
        setEnrollments(data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">📊 My Dashboard</h2>

      {enrollments.length === 0 ? (
        <div className="dashboard-empty">
          <p>No enrollments yet. Go to <strong>Courses</strong> and enroll!</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {enrollments.map((enroll) => {
            const totalLessons = enroll.course.content.length;
            const completedLessons = enroll.progress.length;

            return (
              <div key={enroll._id} className="dashboard-card">
                <h3 className="dashboard-course-title">{enroll.course.title}</h3>
                <p className="dashboard-course-desc">{enroll.course.description}</p>
                <p className="dashboard-progress">
                  Progress: <strong>{completedLessons}</strong> / {totalLessons} lessons
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
