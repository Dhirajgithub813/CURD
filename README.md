# CRUD Task Manager Application - Full Stack

A complete **CRUD (Create, Read, Update, Delete)** application with separate frontend and backend folders, built with Node.js, Express, and vanilla JavaScript for learning web development fundamentals.

## 📁 Project Structure

```
WEB PROJECT/
├── backend/
│   ├── server.js               # Express backend API
│   ├── data/
│   │   └── tasks.json          # Data storage
│   ├── package.json            # Backend dependencies
│   ├── package-lock.json       # Dependency lock file
│   └── node_modules/           # Installed packages
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── style.css               # Styling
│   └── script.js               # Frontend JavaScript
├── package.json                # Root package.json (for convenience)
└── README.md                   # This file
```

## 📋 What is CRUD?

CRUD stands for:
- **C** - **Create**: Add new tasks to the database
- **R** - **Read**: Retrieve and display all tasks
- **U** - **Update**: Modify existing tasks
- **D** - **Delete**: Remove tasks from the database

## ✨ Features

- ✅ **Create**: Add new tasks with title and description
- 📖 **Read**: View all tasks in an organized list
- ✏️ **Update**: Edit task details and mark tasks as complete/incomplete
- 🗑️ **Delete**: Remove tasks from the database
- 🔍 **Filter**: View all tasks, pending tasks, or completed tasks
- 💾 **Persistent Storage**: Tasks are saved to a JSON file
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Clean and attractive user interface with gradient design
- 🏗️ **Separated Architecture**: Clean separation between frontend and backend

## 🚀 Quick Start

### Option 1: Using Root package.json (Recommended)

1. **Install dependencies**:
   ```powershell
   npm run install-all
   ```

2. **Start the server**:
   ```powershell
   npm start
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

### Option 2: Direct Backend Installation

1. **Navigate to backend folder**:
   ```powershell
   cd backend
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Start the server**:
   ```powershell
   npm start
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## 📚 How to Use the Application

### Creating a Task
1. Enter the task title in the input field
2. Optionally add a description
3. Click "Add Task"

### Reading Tasks
- All tasks are displayed in the tasks list
- Click on filter buttons to see: All, Pending, or Completed tasks

### Updating a Task
- Click the "✎ Edit" button to modify task details
- Click "✓ Complete" to mark a task as done
- Click "↩ Reopen" to mark a completed task as pending

### Deleting a Task
- Click the "✕ Delete" button
- Confirm the deletion when prompted

## 🔧 Backend API Endpoints

### POST `/api/tasks`
Create a new task
```json
Request Body:
{
  "title": "Task Title",
  "description": "Task Description"
}

Response:
{
  "id": 1712973600000,
  "title": "Task Title",
  "description": "Task Description",
  "completed": false,
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

### GET `/api/tasks`
Retrieve all tasks

### GET `/api/tasks/:id`
Retrieve a specific task by ID

### PUT `/api/tasks/:id`
Update a task
```json
Request Body:
{
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true
}
```

### DELETE `/api/tasks/:id`
Delete a task

## 🏗️ Architecture

### Frontend (`/frontend`)
- **index.html**: Main HTML structure with form and task list
- **style.css**: Responsive CSS with gradient design and animations
- **script.js**: Fetch API calls and DOM manipulation

### Backend (`/backend`)
- **server.js**: Express server with CRUD endpoints
- **data/tasks.json**: JSON file database for persistence
- **package.json**: Node dependencies (express, cors, body-parser)

## 💡 Learning Outcomes

By working with this project, you'll learn:
- Full-stack web development structure
- RESTful API design principles
- Frontend-backend separation of concerns
- HTTP operations (GET, POST, PUT, DELETE)
- DOM manipulation with JavaScript
- Asynchronous programming with Fetch API
- Express.js fundamentals
- JSON data handling
- File system operations in Node.js
- Project organization best practices

## 🎓 Next Steps to Enhance

1. **Database Integration**: Replace JSON file with MongoDB or MySQL
   ```bash
   npm install mongoose
   ```

2. **Authentication**: Add user login and registration
   ```bash
   npm install jsonwebtoken bcryptjs
   ```

3. **Validation**: Add input validation on frontend and backend
   ```bash
   npm install joi
   ```

4. **Advanced Features**:
   - Task categories and priorities
   - Due dates and reminders
   - Search functionality
   - Dark mode toggle
   - Export to CSV/PDF

5. **Deployment**: Deploy to cloud platforms
   - Heroku
   - Vercel
   - AWS
   - Azure

## 📝 Key Design Decisions

- **Separation of Concerns**: Frontend and backend are in separate folders
- **JSON Storage**: Simple file-based storage for learning purposes
- **CORS Enabled**: Frontend can make requests from different origins
- **Static File Serving**: Backend serves the frontend from the parent directory
- **Timestamps**: All tasks include creation timestamps

## 🔍 File Descriptions

### Backend Files

**server.js**
- Express server setup
- CORS and body-parser middleware configuration
- Four API routes (POST, GET, PUT, DELETE)
- File-based data persistence

**data/tasks.json**
- Stores all tasks as JSON array
- Created automatically on first run
- Updated after any CRUD operation

**package.json** (Backend)
- Dependencies: express, cors, body-parser
- Start script for running the server

### Frontend Files

**index.html**
- Semantic HTML structure
- Form for input
- Task list container
- Modal for editing tasks

**style.css**
- Responsive design (mobile-first)
- Gradient backgrounds
- Smooth animations and transitions
- Organized sections and components

**script.js**
- Fetch API for server communication
- Event listeners for all CRUD operations
- DOM rendering and filtering
- Modal management

## 🐛 Troubleshooting

**"Cannot find module 'express'"**
- Run `npm install` in the backend folder
- Make sure you're in the correct directory

**"Port 3000 already in use"**
- Change the PORT variable in backend/server.js
- Or close the application using port 3000

**"Frontend not loading"**
- Make sure the server is running
- Check browser console for errors (F12)
- Clear browser cache and reload

## 📄 License

ISC

---

**Happy Coding!** 🎉
