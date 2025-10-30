// Note: This application uses in-memory storage.
// Tasks will persist during the session only.

// Global task array - this serves as our data store
let tasks = [];
let taskIdCounter = 1;

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const clearAllBtn = document.getElementById('clearAllBtn');

// Initialize app
function init() {
    loadTasks();
    renderTasks();
    updateStats();
    attachEventListeners();
}

// Attach event listeners
function attachEventListeners() {
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    clearAllBtn.addEventListener('click', clearAllTasks);
}

// Load tasks from storage (in-memory for this implementation)
function loadTasks() {
    // Tasks are stored in memory during the current session
    // For demo purposes, start with an empty array
}

// Save tasks to storage (in-memory for this implementation)
function saveTasks() {
    // For this implementation, tasks are already in memory
    // No additional storage needed
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Validate input
    if (taskText === '') {
        taskInput.focus();
        taskInput.style.borderColor = 'var(--color-error)';
        setTimeout(() => {
            taskInput.style.borderColor = '';
        }, 500);
        return;
    }
    
    // Create new task object
    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        created_at: new Date().toISOString()
    };
    
    // Add to tasks array
    tasks.unshift(newTask); // Add to beginning of array
    
    // Save and update UI
    saveTasks();
    renderTasks();
    updateStats();
    
    // Clear input
    taskInput.value = '';
    taskInput.focus();
}

// Toggle task completion
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Delete a task
function deleteTask(taskId) {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    
    // Add removing animation
    if (taskElement) {
        taskElement.classList.add('removing');
        
        // Wait for animation to complete
        setTimeout(() => {
            tasks = tasks.filter(t => t.id !== taskId);
            saveTasks();
            renderTasks();
            updateStats();
        }, 250);
    }
}

// Clear all tasks
function clearAllTasks() {
    if (tasks.length === 0) return;
    
    const confirmClear = confirm('Are you sure you want to delete all tasks?');
    if (confirmClear) {
        tasks = [];
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Render all tasks
function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';
    
    // Show/hide empty state
    if (tasks.length === 0) {
        emptyState.style.display = 'flex';
        taskList.style.display = 'none';
        clearAllBtn.style.display = 'none';
        return;
    } else {
        emptyState.style.display = 'none';
        taskList.style.display = 'block';
        clearAllBtn.style.display = 'inline-flex';
    }
    
    // Render each task
    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });
}

// Create a task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-task-id', task.id);
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleComplete(task.id));
    
    // Task content
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    
    const taskText = document.createElement('div');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    const taskMeta = document.createElement('div');
    taskMeta.className = 'task-meta';
    taskMeta.textContent = formatDate(task.created_at);
    
    taskContent.appendChild(taskText);
    taskContent.appendChild(taskMeta);
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    // Assemble task item
    li.appendChild(checkbox);
    li.appendChild(taskContent);
    li.appendChild(deleteBtn);
    
    return li;
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
}

// Format date for display
function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) {
        return 'Just now';
    } else if (diffMins < 60) {
        return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}