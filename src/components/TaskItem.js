import { useState } from 'react';
import { ListGroup, Form, Button, Fade, Badge } from 'react-bootstrap';

function TaskItem({ task, toggleTask, editTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDate, setEditDate] = useState(task.dueDate || '');
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editCategory, setEditCategory] = useState(task.category || 'Personal');

  const handleEdit = () => {
    if (isEditing) {
      if (editTitle.trim() === '') {
        alert('Task title cannot be empty');
        return;
      }
      editTask(task.id, {
        title: editTitle.trim(),
        dueDate: editDate,
        description: editDescription,
        category: editCategory,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Fade in={true}>
      <ListGroup.Item className="d-flex align-items-start gap-2 animate-item">
        <Form.Check
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`Mark ${task.title} as completed`}
        />
        <div className="flex-grow-1 task-content">
          {isEditing ? (
            <>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                className="mb-2"
                aria-label="Edit task title"
              />
              <Form.Control
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="mb-2"
                aria-label="Edit due date"
              />
              <Form.Control
                as="textarea"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Task description"
                rows={3}
                className="mb-2"
                aria-label="Edit task description"
              />
              <Form.Select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                aria-label="Edit task category"
              >
                <option value="Personal">Personal</option>
                <option value="Professional">Professional</option>
              </Form.Select>
            </>
          ) : (
            <div>
              <span
                className={`task-title ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
              >
                {task.title}
              </span>
              {task.dueDate && (
                <div className="text-muted small">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
              {task.description && (
                <div className="text-muted small">{task.description}</div>
              )}
              <Badge bg={task.category === 'Personal' ? 'info' : 'warning'} className="ms-2">
                {task.category}
              </Badge>
            </div>
          )}
        </div>
        <Button
          variant={isEditing ? 'success' : 'outline-primary'}
          size="sm"
          onClick={handleEdit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </Button>
      </ListGroup.Item>
    </Fade>
  );
}

export default TaskItem;