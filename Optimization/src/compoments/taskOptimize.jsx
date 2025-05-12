import { useState, useMemo, useCallback, memo } from 'react';

const TodoItem = memo(({ text, completed, id, onToggle }) => {
  useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 10000000; i++) sum += i;
    return sum;
  }, []);

  return (
    <li
      onClick={() => onToggle(id)}
      style={{ textDecoration: completed ? 'line-through' : 'none' }}
    >
      {text}
    </li>
  );
});

function AppOptimize() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Fix performance', completed: false },
  ]);
  const [input, setInput] = useState('');

  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const addTodo = useCallback(() => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput('');
  }, [input]);

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            id={todo.id}
            onToggle={toggleTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default AppOptimize;
