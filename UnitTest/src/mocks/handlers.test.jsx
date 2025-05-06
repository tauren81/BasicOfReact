import { server } from './server';
import TodoList from '../components/TodoList';
import { fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

//beforeAll(() => server.listen());
//afterEach(() => server.resetHandlers());
//afterAll(() => server.close());

describe('TaskList Component', () => {
  it('should load tasks from API when page loads', async () => {
    //const [todos, setTodos] = useState([
    //  { id: 1, text: 'Test todo 1', completed: false },
    //  { id: 2, text: 'Test todo 2', completed: true },
    //]);

    //let postRequest: any = null;
    const response = await fetch('https://api.example.com/todos');
    const todos = await response.json();

    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <TodoList
        todos={todos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    // Check that loading state appears
    //expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for tasks to load and check they are displayed
    await expect(screen.getByText('Mocked todo')).toBeInTheDocument();

    // Verify loading state is gone
    //expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  /*
  it('should send a POST request when adding a new task', async () => {
    render(<TodoList />);

    // Wait for initial load
    await screen.findByText('Existing Task 1');

    
    // Mock the POST request handler to capture the request
    let postRequest: any = null;
    server.use(
      rest.post('/api/tasks', (req, res, ctx) => {
        postRequest = req;
        return res(
          ctx.json({ id: 3, title: 'New Task', completed: false }),
          ctx.status(201)
        );
      })
    );

    // Add a new task
    const input = screen.getByPlaceholderText('Add new task');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    // Check that the POST request was made with correct data
    await waitFor(() => {
      expect(postRequest).not.toBeNull();
      expect(postRequest.body).toEqual({ title: 'New Task' });
    });

    // Verify the new task appears in the list
    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });
  */
});
