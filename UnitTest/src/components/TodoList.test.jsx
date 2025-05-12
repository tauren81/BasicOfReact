import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import { useState } from 'react';

function TodoListWrapper() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Test todo 1', completed: false },
    { id: 2, text: 'Test todo 2', completed: true },
  ]);

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
  );
}

describe('TodoList', () => {
  const mockTodos = [
    { id: 1, text: 'Test todo 1', completed: false },
    { id: 2, text: 'Test todo 2', completed: true },
  ];

  const mockEmptyTodos = [];

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders todo not empty list correctly', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    // Проверяем, что список задач отображается
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();

    // Проверяем, что каждая задача отображается корректно
    expect(screen.getByText('Test todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test todo 2')).toBeInTheDocument();

    // Проверяем состояние чекбоксов
    const checkbox1 = screen.getByTestId('toggle-1');
    const checkbox2 = screen.getByTestId('toggle-2');
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).toBeChecked();
  });

  it('renders todo empty list correctly', () => {
    render(
      <TodoList
        todos={mockEmptyTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    // Проверяем, что список задач отображается
    expect(screen.getByTestId('empty-list')).toBeInTheDocument();
    expect(screen.getByText('No todos found')).toBeInTheDocument();
  });

  it('updates task status when toggled', () => {
    render(<TodoListWrapper />);

    // Проверяем начальное состояние
    const checkbox1 = screen.getByTestId('toggle-1');
    const checkbox2 = screen.getByTestId('toggle-2');
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).toBeChecked();

    // Переключаем статус первой задачи
    fireEvent.click(checkbox1);

    // Проверяем, что статус первой задачи изменился
    expect(checkbox1).toBeChecked();
  });
});
