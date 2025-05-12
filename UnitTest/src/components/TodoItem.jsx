export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
      <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          data-testid={`toggle-${todo.id}`}
        />
        <span data-testid={`todo-text-${todo.id}`}>{todo.text}</span>
        <button 
          onClick={() => onDelete(todo.id)}
          data-testid={`delete-${todo.id}`}
        >
          Delete
        </button>
      </div>
    );
  }