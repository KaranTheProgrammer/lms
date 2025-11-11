import { useEffect, useState } from "react";
import { getEnrollments, getCourses } from "../services/api";

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEnrollments();
      const allCourses = await getCourses();

      // Match lessons count
      const enriched = data.map((en) => {
        const course = allCourses.find((c) => c._id === en.course._id);
        const totalLessons = course ? course.content.length : 0;
        const completedLessons = en.progress.length;
        return {
          ...en,
          totalLessons,
          completedLessons,
        };
      });

      setEnrollments(enriched);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>📊 My Dashboard</h2>
      {enrollments.length === 0 && <p>No enrollments yet.</p>}

      {enrollments.map((en) => (
        <div key={en._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <h3>{en.course.title}</h3>
          <p>{en.course.description}</p>
          <p>
            Progress: {en.completedLessons} / {en.totalLessons} lessons
          </p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
