Professional React To-Do List Application
A feature-rich to-do list web application built with React, React Bootstrap, and Create React App. Includes task management with categories (Personal/Professional), search, dropdown filtering, modal form, tabbed views, and local storage persistence.
Features

Add tasks via modal with title (required), due date, description, and category (Personal/Professional)
Edit tasks with all fields and validation
Delete tasks
Mark tasks as completed with checkboxes
Filter tasks by tabs (All, Active, Completed)
Search tasks by title, description, or due date
Dropdown filter within tabs (All, Pending, Completed)
Persist tasks in local storage
Smooth animations (modal fade, task hover, list fade)
Responsive design with no text truncation

Prerequisites

Node.js (v16 or higher)
npm (v7 or higher)
Git

Installation

Clone the repository:git clone <your-repo-url>
cd todo-app


Install dependencies:npm install


Start the development server:npm start


Open http://localhost:3000.

Project Structure

src/
App.js: Main component with search, dropdown, tabs, and task list.
components/TaskList.js: Renders the list of tasks.
components/TaskItem.js: Individual task with category badge.
components/AddTaskModal.js: Modal form for adding tasks.
App.css: Styles for animations and text wrapping.
index.js: Entry point for React.


index.html: HTML template.

Usage

Add Task: Click "Add New Task" to open a modal. Enter details and submit.
Edit Task: Click "Edit", modify fields, and click "Save".
Delete Task: Click "Delete".
Complete Task: Check the checkbox.
Filter Tabs: Use tabs (All, Active, Completed).
Search: Type in the search bar to filter tasks.
Dropdown Filter: Select All, Pending, or Completed from the dropdown.
Persistence: Tasks persist after refresh via local storage.

Debugging
Local Storage
If tasks do not persist:

Open DevTools (F12) > Application > Local Storage > http://localhost:3000.
Check tasks key for a JSON array.
View Console for logs:Loading tasks from local storage: [...]
Saving tasks to local storage: [...]


Clear local storage and test adding a task.

ESLint
If errors occur:

Run npm run lint.
Fix issues in reported files.

Technologies Used

React 18
React Bootstrap 2
Bootstrap 5
Create React App
Local Storage

Contributing
Submit issues or pull requests to improve the application.
License
MIT License