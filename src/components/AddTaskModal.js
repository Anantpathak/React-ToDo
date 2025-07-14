import { useState } from 'react';
import { Modal, Form, Button, Alert, FloatingLabel } from 'react-bootstrap';

function AddTaskModal({ show, onHide, onAddTask }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      setError('Task title is required');
      return;
    }
    setError('');
    onAddTask({ title, dueDate, description, category });
    setTitle('');
    setDueDate('');
    setDescription('');
    setCategory('Personal');
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="fade show"
      style={{ transition: 'all 0.4s ease-in-out' }}
    >
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Form onSubmit={handleSubmit} className="p-2 rounded shadow-sm bg-white">
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Task Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              aria-label="Task title"
              isInvalid={error !== ''}
              className="border border-2"
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Due Date (Optional)</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              aria-label="Due date"
              className="border border-secondary-subtle"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              aria-label="Task description"
              className="border border-secondary-subtle"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Task category"
              className="border border-secondary-subtle"
            >
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
            </Form.Select>
          </Form.Group>

          {error && (
            <Alert
              variant="danger"
              className="fade show shadow-sm py-2 px-3 mb-3 rounded"
              style={{ animation: 'fadeIn 0.5s ease-in-out' }}
            >
              {error}
            </Alert>
          )}

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              className="fw-bold py-2"
              style={{ transition: 'all 0.3s ease' }}
            >
              Add Task
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTaskModal;
