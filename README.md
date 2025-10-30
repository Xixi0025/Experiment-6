# To-Do List Application with Local Storage

A simple yet powerful to-do list web application built with vanilla JavaScript that persists tasks using browser Local Storage.

## Features

✅ **Add Tasks** - Quickly add new tasks to your list  
✅ **Mark Complete** - Check off tasks when done (strikethrough styling)  
✅ **Delete Tasks** - Remove individual tasks or clear all at once  
✅ **Local Storage Persistence** - Tasks remain saved even after closing your browser  
✅ **Task Counter** - View total and completed task counts  
✅ **Responsive Design** - Works seamlessly on desktop and mobile devices  

## How to Run

### Option 1: Direct File Access
1. Extract the project files
2. Open `index.html` directly in your web browser
3. Start adding tasks!

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server package)
npx http-server
```
Then open `http://localhost:8000` in your browser.

## How to Use

1. **Add a Task**: Type your task in the input field and press Enter or click "Add Task"
2. **Mark Complete**: Click the checkbox next to a task to mark it done (appears with strikethrough)
3. **Delete a Task**: Click the "Delete" button next to any task to remove it
4. **Clear All Tasks**: Click "Clear All" to remove all tasks at once
5. **Your tasks are auto-saved** - Close and reopen your browser; your tasks will still be there!

## Project Structure

```
├── index.html      # HTML structure
├── style.css       # Styling and animations
├── script.js       # JavaScript functionality with Local Storage
└── README.md       # This file
```

## Technical Details

- **Storage Method**: Browser Local Storage (no server required)
- **Data Format**: JSON
- **Browser Compatibility**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **No Dependencies**: Pure vanilla JavaScript - no frameworks or libraries needed

## Local Storage Explanation

Your tasks are saved in your browser's Local Storage under the key `todoList`. Each task contains:
- Unique ID
- Task text
- Completion status
- Creation timestamp

This means your data stays on YOUR computer and is never sent to any server.

## Tips

- Tasks are saved automatically - no need to manually save
- Each session preserves all your tasks
- Clear browser data/cache will remove stored tasks
- Works offline once loaded

---
