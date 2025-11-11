import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

function App() {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="main-content">
                    <Topbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/courses/:id" element={<CourseDetail />} />
                        <Route path="/learn/:id" element={<Learn />} />
                        <Route path="/quiz/:id" element={<Quiz />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;