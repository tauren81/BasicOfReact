import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/todos', (req, res, ctx) => {
    return HttpResponse.json(
      //ctx.delay(100),
      [{ id: 4, text: 'Mocked todo', completed: false }],
    );
  }),
  // Добавьте другие моки API по аналогии
];
