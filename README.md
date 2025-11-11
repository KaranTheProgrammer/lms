# Health & Safety Learning Management System

## Project Overview
This is a Health & Safety Learning Management System (LMS) designed to deliver compliance-ready eLearning programs that meet the Ontario eLearning Design Guidelines.

## Core Modules
1. **User Roles**: Super Admin, Instructor, Learner
2. **Course Management**: Create/edit courses, upload SCORM packages, assign courses, track progress.
3. **Lesson & Quiz Engine**: Manage lessons and quizzes, record scores, conform to SCORM tracking.
4. **Compliance Reporting**: Generate reports by course or learner, export to CSV/PDF.
5. **Accessibility & UX**: Follow WCAG 2.1 AA, responsive design, support English/French localization.

## Technology Stack
- **Backend**: Node.js + Express + SQLite (dev) / MongoDB (prod)
- **Frontend**: React + Vite
- **API**: REST JSON
- **Auth**: JWT with roles

## Getting Started
1. Clone the repository.
2. Navigate to the backend directory and run `npm install`.
3. Create a `.env` file based on `.env.sample`.
4. Run the seed script to populate the database: `node seed.js`.
5. Navigate to the frontend directory and run `npm install`.
6. Run the application: `npm run dev`.

## Compliance Goals
For more information, refer to the official Ontario eLearning Design Guidelines: [Ontario eLearning Design Guidelines](https://www.ontario.ca/page/elearning-design-guidelines-health-and-safety-training-programs#section-7)