# 🛠️ Использование MSW (Mock Service Worker) для реалистичного мокинга API

## 🌟 Преимущества MSW

- **Реальные HTTP-запросы** - перехватываются на уровне сети
- **Единые моки для тестов и разработки**
- **Простота миграции с моков на боевое API**

## 🏗️ Базовая настройка

### 1. Установка

```bash
npm install msw --save-dev
# или
yarn add msw --dev
```

### Создание мок-сервера

```js
// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

### Пример обработчиков

```js
// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // GET /user
  rest.get("/api/user", (req, res, ctx) => {
    return res(
      ctx.delay(150), // Имитация задержки сети
      ctx.json({
        id: 1,
        name: "Иван Иванов",
        email: "ivan@example.com",
      })
    );
  }),

  // POST /login
  rest.post("/api/login", async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (password !== "validpass") {
      return res(
        ctx.status(401),
        ctx.json({ error: "Неверные учетные данные" })
      );
    }

    return res(ctx.json({ token: "mock-jwt-token" }));
  }),
];
```

## Использование в тестах

### Интеграционный тест с MSW

```js
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import LoginForm from "../components/LoginForm";

// Включить мок-сервер перед тестами
beforeAll(() => server.listen());
// Сбросить обработчики после каждого теста
afterEach(() => server.resetHandlers());
// Остановить сервер после завершения
afterAll(() => server.close());

test("Успешная авторизация", async () => {
  render(<LoginForm />);

  await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
  await userEvent.type(screen.getByLabelText("Пароль"), "validpass");
  await userEvent.click(screen.getByRole("button", { name: "Войти" }));

  await waitFor(() => {
    expect(screen.getByText("Добро пожаловать!")).toBeInTheDocument();
  });
});

test("Обработка ошибки авторизации", async () => {
  render(<LoginForm />);

  await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
  await userEvent.type(
    screen.getByLabelText("Пароль"),
    "wrongpass" // Неверный пароль
  );
  await userEvent.click(screen.getByRole("button", { name: "Войти" }));

  await waitFor(() => {
    expect(screen.getByText("Неверные учетные данные")).toBeInTheDocument();
  });
});
```

```js
// Использование с faker.js для реалистичных данных
import { faker } from "@faker-js/faker";

rest.get("/api/users", (req, res, ctx) => {
  return res(
    ctx.json(
      Array(10)
        .fill()
        .map(() => ({
          id: faker.datatype.uuid(),
          name: faker.name.fullName(),
          email: faker.internet.email(),
        }))
    )
  );
});
```
