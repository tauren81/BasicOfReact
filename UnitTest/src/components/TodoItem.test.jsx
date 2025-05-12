import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';
import { expect, jest, test } from '@jest/globals';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    completed: false,
  };

  const mockTodoed = { ...mockTodo, completed: true };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('Вызывает onToggle при клике на кнопку', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    await userEvent.click(screen.getByTestId('toggle-1'));
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('renders todoed item correctly', () => {
    render(
      <TodoItem
        todo={mockTodoed}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    //expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByTestId('toggle-1')).toBeChecked();
  });

  test('Вызывает onDelete при клике на кнопку', async () => {
    render(<TodoItem todo={mockTodo} onDelete={mockOnDelete} />);

    await userEvent.click(screen.getByTestId('delete-1'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
