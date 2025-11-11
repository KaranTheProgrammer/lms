import React, { useState } from 'react';

const CourseBuilder = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const handleAddLesson = () => {
    // Logic to add a lesson
    setLessons([...lessons, { title: '', content: '' }]);
  };

  const handleAddQuiz = () => {
    // Logic to add a quiz
    setQuizzes([...quizzes, { title: '', questions: [] }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit course data to backend
  };

  return (
    <div>
      <h1>Course Builder</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Title:</label>
          <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />
        </div>
        <div>
          <label>Course Description:</label>
          <textarea value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <h2>Lessons</h2>
          {lessons.map((lesson, index) => (
            <div key={index}>
              <input type="text" placeholder="Lesson Title" />
              <textarea placeholder="Lesson Content"></textarea>
            </div>
          ))}
          <button type="button" onClick={handleAddLesson}>Add Lesson</button>
        </div>
        <div>
          <h2>Quizzes</h2>
          {quizzes.map((quiz, index) => (
            <div key={index}>
              <input type="text" placeholder="Quiz Title" />
              {/* Add quiz questions logic here */}
            </div>
          ))}
          <button type="button" onClick={handleAddQuiz}>Add Quiz</button>
        </div>
        <button type="submit">Save Course</button>
      </form>
    </div>
  );
};

export default CourseBuilder;
