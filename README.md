# task-dashboard

Task Dashboard – Multi-Tenant Task Management System

This project is a simple multi-tenant task management system built using Laravel (Backend) and React (Frontend).
It allows Admins to create users and assign tasks, while Users can view and update their task status.

 Features
Admin

Create Users

Assign Tasks

View all tasks

User

View assigned tasks

Update task status (Pending → InProgress → Completed)

 

Git

 Project Setup Instructions
1. Clone Repository
git clone https://github.com/seethalaxmi600-droid/task-dashboard.git
cd task-dashboard

 Backend (Laravel) Setup
2. Go to Backend Folder
cd backend_task

3. Install Dependencies
composer install

4. Create .env File
cp .env.example .env

5. Update Database Credentials

Inside .env:

DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

6. Generate App Key
php artisan key:generate

7. Run Migrations
php artisan migrate



8. Start Backend Server
php artisan serve


Backend will run at:

http://127.0.0.1:8000

 Frontend (React) Setup
9. Go to React App Folder
cd ../my-app

10. Install Dependencies
npm install

11. Start React App
npm run dev


Frontend will run at:

http://localhost:5173

 Admin Login Credentials

Use these credentials to sign in as Admin:

Email: admin@test.com  
Password: password




 API Base URL

Update Axios instance:

http://127.0.0.1:8000/api

 Project Folder Structure
task-dashboard/
│
├── backend_task/   → Laravel API
└── my-app/         → React Frontend


React frontend includes pages for:

Login

Admin dashboard

User task list
