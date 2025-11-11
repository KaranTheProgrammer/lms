import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// ✅ Attach token if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ==================
// Courses
// ==================
export async function createCourse(courseData) {
  const res = await API.post('/courses', courseData);
  return res.data;
};

export async function getCourses() {
  const res = await API.get("/courses");
  return res.data;
}

// ==================
// Enrollments
// ==================
export async function enrollInCourse(courseId) {
  const res = await API.post(`/enrollments/${courseId}`);
  return res.data;
}

export async function getEnrollments() {
  const res = await API.get("/enrollments");
  return res.data;
}

export async function completeLesson(courseId, lessonId, score) {
  const res = await API.put(`/enrollments/${courseId}/lesson/${lessonId}`, { score });
  return res.data;
}

// ==================
// ✅ Quizzes
// ==================
export async function submitQuiz(courseId, lessonId, answers) {
  const res = await API.post(`/courses/${courseId}/lessons/${lessonId}/quiz`, { answers });
  return res.data; // { total, score }
}

export default API;
