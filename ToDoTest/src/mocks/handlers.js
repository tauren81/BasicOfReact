import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.example.com/todos', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json([
        { id: 1, text: 'Mocked todo', completed: false }
      ])
    );
  }),
  // Добавьте другие моки API по аналогии
];