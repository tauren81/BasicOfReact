# Ключевые практики в тестировании

- Юнит-тесты проверяют отдельные, изолированные части приложения (обычно функции или компоненты) на корректность работы.

### Инструменты:

- Jest — основной фреймворк для тестирования в React
- React Testing Library (RTL) — для тестирования React-компонентов
- Enzyme (альтернатива RTL, но менее популярна в новых проектах)

### Тестируйте один аспект за раз:

- Каждый тест должен проверять только одну вещь

#### 1. Тестирование рендеринга

```javascript
// UserInfo.test.js
test("Рендерит имя пользователя", () => {
  render(<UserInfo user={{ name: "Anna" }} />);
  expect(screen.getByTestId("user-name")).toHaveTextContent("Anna");
});

test("Рендерит аватар с корректным src", () => {
  render(<UserInfo user={{ avatar: "avatar.jpg" }} />);
  expect(screen.getByTestId("user-avatar")).toHaveAttribute(
    "src",
    "avatar.jpg"
  );
});
```

#### 2. Тестирование поведения

```javascript
// UserActions.test.js
test("Вызывает onEdit при клике на кнопку", async () => {
  const mockOnEdit = jest.fn();
  render(<UserActions onEdit={mockOnEdit} />);

  await userEvent.click(screen.getByTestId("edit-btn"));
  expect(mockOnEdit).toHaveBeenCalledTimes(1);
});

test("Отправляет форму с корректными данными", async () => {
  const mockSubmit = jest.fn();
  render(<UserForm onSubmit={mockSubmit} />);

  await userEvent.type(screen.getByTestId("name-input"), "Alex");
  await userEvent.click(screen.getByTestId("submit-btn"));

  expect(mockSubmit).toHaveBeenCalledWith({ name: "Alex" });
});
```

#### 3. Тестирование ошибок

```javascript
// ErrorBoundary.test.js
test("Показывает fallback при ошибке рендеринга", () => {
  const BrokenComponent = () => {
    throw new Error("Test error");
  };

  render(
    <ErrorBoundary fallback={<div data-testid="error-fallback">Error!</div>}>
      <BrokenComponent />
    </ErrorBoundary>
  );

  expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
});

// useUser.test.js
test("Обрабатывает ошибку загрузки данных", async () => {
  api.getUser.mockRejectedValue(new Error("Network error"));

  const { result } = renderHook(() => useUser(1));
  await waitFor(() => {
    expect(result.current.error).toBe("Network error");
    expect(result.current.loading).toBe(false);
  });
});
```

- Разделяйте тесты на рендеринг, поведение и ошибки

### Правила хороших тестов

#### Одна проверка на тест:

```javascript
// Плохо:
test("Рендерит и обрабатывает клики", () => {
  // ...и проверка рендеринга, и проверка клика
});

// Хорошо:
test("Рендерит кнопку", () => {
  /_ ... _/;
});
test("Обрабатывает клик", () => {
  /_ ... _/;
});
```

#### Чёткие названия:

```javascript
// Плохо:
test("Тест компонента", () => {});

// Хорошо:
test("Отображает сообщение об ошибке при status=500", () => {});
```

#### Изолированные сценарии:

```javascript
// Для каждого состояния - отдельный тест
describe("UserStatus", () => {
  test('Показывает "Online" при isOnline=true', () => {});
  test('Показывает "Offline" при isOnline=false', () => {});
  test("Показывает индикатор загрузки при isOnline=null", () => {});
});
```

### Используйте data-testid:

```jsx
<button data-testid="submit-button">Submit</button>
```

Вместо:

```jsx
<button className="submit-btn">Submit</button>
// Или поиск по тексту, который может измениться
```

### Мокайте внешние зависимости:

```jsx
// Мокаем весь модуль
jest.mock("./services/api");

// Или конкретную функцию
api.getUser = jest.fn().mockResolvedValue(mockData);
```

### Тестируйте поведение, а не реализацию:

- Проверяйте, что происходит при кликах, вводе данных и т.д.

- Избегайте проверки внутреннего состояния компонента

### Используйте userEvent для симуляции действий пользователя:

```jsx
userEvent.click(screen.getByTestId("button"));
userEvent.type(screen.getByTestId("input"), "Hello");
```

### Проверяйте доступность элементов:

```jsx
expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();
expect(screen.getByLabelText("Username")).toBeRequired();
```
