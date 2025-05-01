import { fireEvent, render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import AddTodo from './AddTodo';
import { expect, jest, test } from '@jest/globals';
import { getActiveElementOrBody } from '@testing-library/user-event/dist/cjs/utils/index.js';

describe('AddToDo', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Add task correctly', () => {
    render(<AddTodo onAdd={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText('Add new todo...');

    fireEvent.change(input, { target: { value: 'First blood' } });
    fireEvent.click(screen.getByTestId('add-button'));

    expect(mockOnAddTodo).toHaveBeenCalledWith('First blood');
  });

  test('Clear form after add', () => {
    render(<AddTodo onAdd={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText('Add new todo...');

    fireEvent.change(input, { target: { value: 'First blood' } });
    fireEvent.click(screen.getByTestId('add-button'));

    expect(input.value).toBe('');
  });
});
