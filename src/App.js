import { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Tabs,
  Tab,
  Form,
  Dropdown,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        } else {
          setTasks([]);
        }
      } else {
        setTasks([]);
      }
    } catch (e) {
      setTasks([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks:', e);
    }
  }, [tasks, isLoaded]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true;
    })
    .filter((task) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(searchLower) ||
        (task.description &&
          task.description.toLowerCase().includes(searchLower)) ||
        (task.dueDate &&
          new Date(task.dueDate).toLocaleDateString().includes(searchLower))
      );
    })
    .filter((task) => {
      if (statusFilter === 'completed') return task.completed;
      if (statusFilter === 'pending') return !task.completed;
      return true;
    });

  return (
    <Container className="my-5 px-4 py-4 shadow-lg rounded bg-white animate__animated animate__fadeIn">
      <h1 className="text-center mb-4 text-primary fw-bold animate__animated animate__zoomIn">
        Professional To-Do List
      </h1>

      <Row className="mb-4 align-items-center">
        <Col md={6} className="mb-2">
          <Form.Control
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search tasks"
            className="border-primary shadow-sm"
            style={{ transition: 'all 0.3s ease-in-out' }}
          />
        </Col>

        {/* <Col md={3} className="mb-2">
          <Dropdown onSelect={(e) => setStatusFilter(e)}>
            <Dropdown.Toggle
              variant="outline-primary"
              id="status-filter"
              className="w-100 shadow-sm"
            >
              {statusFilter === 'all'
                ? 'Filter: All'
                : `Filter: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="all">All</Dropdown.Item>
              <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
              <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col> */}

        <Col md={3}>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            className="w-100 shadow-sm fw-semibold"
            style={{
              transition: 'background-color 0.3s ease',
            }}
          >
            ➕ Add New Task
          </Button>
        </Col>
      </Row>

      <AddTaskModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddTask={addTask}
      />

      <Tabs
        activeKey={filter}
        onSelect={(k) => setFilter(k)}
        className="mb-4 justify-content-center fw-semibold"
        variant="pills"
      >
        <Tab eventKey="all" title="🗂 All" />
        <Tab eventKey="active" title="🕒 Active" />
        <Tab eventKey="completed" title="✅ Completed" />
      </Tabs>

      {isLoaded ? (
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ) : (
        <div className="text-center text-muted">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading your tasks...</p>
        </div>
      )}
    </Container>
  );
}

export default App;
