import { http, HttpResponse } from 'msw';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todosApi';

export const handlers = [
  http.get('https://api.example.com/todos', async () => {
    return HttpResponse.json([
      ...(await getTodos()),
      { id: 4, text: 'Mocked todo', completed: false },
    ]);
  }),
  http.post('https://api.example.com/todos/add', async () => {
    return HttpResponse.json([
      { id: 4, text: 'Mocked todo', completed: false },
    ]);
  }),
  http.put('https://api.example.com/todos/update', async () => {
    return HttpResponse.json([
      { id: 4, text: 'Mocked todo', completed: false },
    ]);
  }),
  http.delete('https://api.example.com/todos/delete', async () => {
    return HttpResponse.json([
      { id: 4, text: 'Mocked todo', completed: false },
    ]);
  }),
  // Добавьте другие моки API по аналогии
];
