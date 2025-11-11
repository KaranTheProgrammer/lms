import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Courses
export const getCourses = async () => {
  const res = await API.get("/courses");
  return res.data;
};

export const enrollInCourse = async (courseId) => {
  const res = await API.post(`/enrollments/${courseId}`);
  return res.data;
};

// Enrollments
export const getEnrollments = async () => {
  const res = await API.get("/enrollments");
  return res.data;
};

// Auth
export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

export const register = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  return res.data;
};
