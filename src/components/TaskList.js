import TaskItem from './TaskItem';
import { ListGroup, Fade } from 'react-bootstrap';
import taskIcon from './icons8-task.gif'; 

function TaskList({ tasks, toggleTask, editTask, deleteTask }) {
  return (
    <Fade in={true} appear={true} timeout={500}>
      <div className="p-2">
        <ListGroup className="shadow-sm rounded">
          {tasks.length === 0 ? (
            <ListGroup.Item
              className="text-center text-muted py-4 bg-light border-0 d-flex flex-column align-items-center"
              style={{
                fontStyle: 'italic',
                transition: 'opacity 0.4s ease-in-out',
              }}
            >
              <img
                src={taskIcon}
                alt="No Tasks"
                width={48}
                height={48}
                className="mb-2"
              />
              No tasks available
            </ListGroup.Item>
          ) : (
            tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className="border-0 border-bottom border-light-subtle bg-white px-3"
                style={{ animation: 'fadeIn 0.4s ease-in-out' }}
              >
                <TaskItem
                  task={task}
                  toggleTask={toggleTask}
                  editTask={editTask}
                  deleteTask={deleteTask}
                />
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
    </Fade>
  );
}

export default TaskList;
