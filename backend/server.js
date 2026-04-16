require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Application/json'],
  credentials: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Connect to MongoDB
let mongoConnected = false;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      mongoConnected = true;
      console.log('✓ Connected to MongoDB');
    })
    .catch(err => {
      console.error('✗ MongoDB connection error:', err.message);
      console.warn('⚠ Running without MongoDB - data will not persist');
    });
} else {
  console.warn('⚠ MONGODB_URI not set - running in fallback mode');
  console.warn('Set MONGODB_URI in environment variables for persistent storage');
}

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Task Model
const Task = mongoose.model('Task', taskSchema);

// In-memory fallback storage (when MongoDB is not available)
let inMemoryTasks = [];
let taskIdCounter = 1;

// Helper to get next ID
function getNextId() {
  return taskIdCounter++;
}

// CREATE - Add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    if (mongoConnected) {
      const newTask = new Task({
        title: req.body.title,
        description: req.body.description
      });
      await newTask.save();
      console.log('✓ Task created:', newTask);
      res.status(201).json(newTask);
    } else {
      // Fallback to in-memory storage
      const id = getNextId();
      const newTask = {
        _id: id.toString(),
        id: id,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        createdAt: new Date()
      };
      inMemoryTasks.push(newTask);
      console.log('✓ Task created (in-memory):', newTask);
      res.status(201).json(newTask);
    }
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
});

// READ - Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    if (mongoConnected) {
      const tasks = await Task.find();
      console.log('✓ Tasks loaded:', tasks.length);
      res.json(tasks);
    } else {
      // Fallback to in-memory storage
      console.log('✓ Tasks loaded (in-memory):', inMemoryTasks.length);
      res.json(inMemoryTasks);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// READ - Get a single task by ID
app.get('/api/tasks/:id', async (req, res) => {
  try {
    if (mongoConnected) {
      const task = await Task.findById(req.params.id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } else {
      // Fallback to in-memory storage
      const task = inMemoryTasks.find(t => t.id == req.params.id || t._id == req.params.id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Error fetching task' });
  }
});

// UPDATE - Update a task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    if (mongoConnected) {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          completed: req.body.completed
        },
        { new: true }
      );
      
      if (task) {
        console.log('✓ Task updated:', task);
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } else {
      // Fallback to in-memory storage
      const taskIndex = inMemoryTasks.findIndex(t => t.id == req.params.id || t._id == req.params.id);
      if (taskIndex !== -1) {
        inMemoryTasks[taskIndex] = {
          ...inMemoryTasks[taskIndex],
          title: req.body.title || inMemoryTasks[taskIndex].title,
          description: req.body.description !== undefined ? req.body.description : inMemoryTasks[taskIndex].description,
          completed: req.body.completed !== undefined ? req.body.completed : inMemoryTasks[taskIndex].completed
        };
        console.log('✓ Task updated (in-memory):', inMemoryTasks[taskIndex]);
        res.json(inMemoryTasks[taskIndex]);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
});

// DELETE - Remove a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    if (mongoConnected) {
      const task = await Task.findByIdAndDelete(req.params.id);
      
      if (task) {
        console.log('✓ Task deleted');
        res.json({ message: 'Task deleted', task });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } else {
      // Fallback to in-memory storage
      const taskIndex = inMemoryTasks.findIndex(t => t.id == req.params.id || t._id == req.params.id);
      if (taskIndex !== -1) {
        const deletedTask = inMemoryTasks.splice(taskIndex, 1);
        console.log('✓ Task deleted (in-memory)');
        res.json({ message: 'Task deleted', task: deletedTask[0] });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Catch-all route for frontend (MUST be after all /api routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});
