# Student Management System Backend

This is the backend implementation for the Hyrup Technical Assignment. It provides a RESTful API for managing students, with secure authentication and authorization.

## Features
- **Authentication**: User registration and login with JWT and secure password hashing (bcrypt).
- **Student Management**: CRUD operations for student records.
- **Advanced Filtering**: Filter, sort, and paginate student data.
- **Security**: Protected routes, HTTP headers (Helmet), and input validation.

## Tech Stack
- **Node.js & Express**: Backend framework.
- **MongoDB & Mongoose**: Database and ODM.
- **Start**: `npm run dev` (Runs on port 5000)

## API Documentation

### Auth Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and get token |
| GET | `/api/auth/me` | Get current logged-in user (Protected) |

### Student Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/students` | Get all students (Supports query params) |
| POST | `/api/students` | Create a new student (Protected) |
| GET | `/api/students/:id` | Get single student by ID (Protected) |
| PUT | `/api/students/:id` | Update student (Protected) |
| DELETE | `/api/students/:id` | Delete student (Protected) |

## Setup Instructions
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Create a `.env` file in the root directory (copy from `.env.example`).
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
3.  **Run Server**:
    ```bash
    npm run dev
    ```
4.  **Run Tests**:
    ```bash
    npm test
    ```
