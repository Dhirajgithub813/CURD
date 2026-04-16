// API Base URL - Dynamic for localhost and production
const API_URL = window.location.origin + '/api/tasks';

let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const tasksList = document.getElementById('tasksList');
const filterButtons = document.querySelectorAll('.filter-btn');
const editModal = document.getElementById('editModal');
const readModal = document.getElementById('readModal');
const editForm = document.getElementById('editForm');
const closeBtn = document.querySelector('.close');

// Event Listeners
taskForm.addEventListener('submit', addTask);
filterButtons.forEach(btn => btn.addEventListener('click', setFilter));
closeBtn.addEventListener('click', closeEditModal);
window.addEventListener('click', (e) => {
    if (e.target === editModal) closeEditModal();
    if (e.target === readModal) closeReadModal();
});
editForm.addEventListener('submit', updateTask);

// Initialize
document.addEventListener('DOMContentLoaded', loadTasks);

// CREATE - Add a new task
async function addTask(e) {
    e.preventDefault();
    
    if (!taskTitle.value.trim()) {
        alert('Please enter a task title');
        return;
    }

    const newTask = {
        title: taskTitle.value,
        description: taskDescription.value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            const task = await response.json();
            tasks.push(task);
            renderTasks();
            taskForm.reset();
            console.log('✓ Task created:', task);
        }
    } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task');
    }
}

// READ - Load all tasks
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            tasks = await response.json();
            renderTasks();
            console.log('✓ Tasks loaded:', tasks);
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        document.getElementById('tasksList').innerHTML = '<p class="no-tasks">Failed to load tasks. Make sure the server is running.</p>';
    }
}

// UPDATE - Toggle task completion
async function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: !task.completed
            })
        });

        if (response.ok) {
            const updatedTask = await response.json();
            const index = tasks.findIndex(t => t.id === id);
            tasks[index] = updatedTask;
            renderTasks();
            console.log('✓ Task toggled:', updatedTask);
        }
    } catch (error) {
        console.error('Error toggling task:', error);
        alert('Failed to toggle task');
    }
}

// UPDATE - Open edit modal
function openEditModal(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    editingTaskId = id;
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDescription').value = task.description;
    editModal.style.display = 'block';
}

// READ - Open read modal
function openReadModal(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('readTitle').textContent = task.title;
    document.getElementById('readDescription').textContent = task.description || 'No description provided';
    document.getElementById('readStatus').textContent = task.completed ? '✓ Completed' : '⏳ Pending';
    document.getElementById('readDate').textContent = new Date(task.createdAt).toLocaleDateString();
    readModal.style.display = 'block';
}

// READ - Close read modal
function closeReadModal() {
    readModal.style.display = 'none';
}

// UPDATE - Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    editingTaskId = null;
}

// UPDATE - Submit edited task
async function updateTask(e) {
    e.preventDefault();

    if (!editingTaskId) return;

    const updatedTask = {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value
    };

    try {
        const response = await fetch(`${API_URL}/${editingTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        if (response.ok) {
            const task = await response.json();
            const index = tasks.findIndex(t => t.id === editingTaskId);
            tasks[index] = task;
            renderTasks();
            closeEditModal();
            console.log('✓ Task updated:', task);
        }
    } catch (error) {
        console.error('Error updating task:', error);
        alert('Failed to update task');
    }
}

// DELETE - Remove a task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
            console.log('✓ Task deleted');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
    }
}

// Filter tasks based on current filter
function setFilter(e) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderTasks();
}

// Render tasks to DOM
function renderTasks() {
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true;
    });

    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<p class="no-tasks">No tasks to display.</p>';
        return;
    }

    tasksList.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <div class="task-content">
                <h3>${escapeHtml(task.title)}</h3>
                ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
                <div class="task-date">Created: ${new Date(task.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="task-actions">
                <button class="btn-small btn-read" onclick="openReadModal(${task.id})">📖 Read</button>
                <button class="btn-small btn-toggle" onclick="toggleTask(${task.id})">
                    ${task.completed ? '↩ Reopen' : '✓ Complete'}
                </button>
                <button class="btn-small btn-edit" onclick="openEditModal(${task.id})">✏️ Update</button>
                <button class="btn-small btn-delete" onclick="deleteTask(${task.id})">✕ Delete</button>
            </div>
        </div>
    `).join('');
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
