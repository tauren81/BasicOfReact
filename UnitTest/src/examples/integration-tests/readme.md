# Интеграционное тестирование

- Проверка взаимодействия нескольких компонентов или модулей приложения.

### Инструменты:

- Jest + React Testing Library — основной стек
- Mock Service Worker (MSW) — для мокирования API запросов

## Основные принципы

1. **Тестируйте "счастливый путь"**  
   Проверяйте корректную работу связки компонентов при правильных данных

2. **Имитируйте реальное взаимодействие**  
   Пользовательские сценарии вместо технических деталей

3. **Сохраняйте баланс**  
   Больше юнит-тестов, меньше интеграционных (пирамида тестирования)

## Практические примеры

### 1. Тестирование формы с отправкой данных

```javascript
test("Отправка формы вызывает API и показывает успешное сообщение", async () => {
  // Мокаем API
  api.submitForm.mockResolvedValue({ success: true });

  // Рендерим всю цепочку компонентов
  render(
    <FormProvider>
      <UserForm />
      <FormStatus />
    </FormProvider>
  );

  // Имитируем действия пользователя
  await userEvent.type(screen.getByLabelText("Имя"), "Иван");
  await userEvent.click(screen.getByText("Отправить"));

  // Проверяем взаимодействие
  await waitFor(() => {
    expect(api.submitForm).toHaveBeenCalledWith({ name: "Иван" });
    expect(screen.getByText("Успешно отправлено!")).toBeInTheDocument();
  });
});
```

### 2. Тестирование связки компонентов с контекстом

```javascript
test("Компоненты корректно работают с общим контекстом", async () => {
  render(
    <ThemeContext.Provider value="dark">
      <Header />
      <UserProfile />
    </ThemeContext.Provider>
  );

  expect(screen.getByTestId("header")).toHaveStyle("background-color: #222");
  expect(screen.getByTestId("profile-card")).toHaveStyle(
    "background-color: #222"
  );
});
```

### 3. Тестирование маршрутизации

```javascript
test("Навигация между страницами работает корректно", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </MemoryRouter>
  );

  await userEvent.click(screen.getByText("Мой профиль"));
  expect(screen.getByText("Личные данные")).toBeInTheDocument();
});
```

## Критерии хороших интеграционных тестов

#### 1. Реальные сценарии

- Тестируйте типичные пользовательские потоки:

```
// Плохо: проверка пропсов
// Хорошо: заполнение формы → отправка → проверка результата
```

#### 2. Минимальные моки

- Мокайте только внешние зависимости (API, сервисы):

```js
// Мокаем только API
api.getUser.mockResolvedValue(userMock);
// Не мокаем внутренние компоненты
```

#### 3. Проверяйте результаты

- Фокус на итоговом состоянии, а не промежуточных шагах:

```
// Плохо: проверка вызова setState
// Хорошо: проверка отображения результата
```

#### 4. Используйте реалистичные данные

```
// Плохо: { name: 'test' }
// Хорошо: { name: 'Иван', email: 'ivan@example.com' }
```

## Чего избегать

#### Избыточных проверок

Не тестируйте уже проверенное в юнит-тестах

#### Тестовых ID везде

Используйте семантические селекторы где возможно:

```javascript
// Предпочтительно:
screen.getByRole("button", { name: /сохранить/i });
// Чем:
screen.getByTestId("save-button");
```

#### Слишком больших тестов

Разбивайте сложные сценарии на несколько тестов

## Пример

```js
describe("Авторизация", () => {
  beforeEach(() => {
    api.login.mockClear();
  });

  test("Успешная авторизация", async () => {
    // Подготовка
    api.login.mockResolvedValue({ token: "123" });

    // Рендеринг
    render(<AuthFlow />);

    // Действия
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "password");
    await userEvent.click(screen.getByRole("button", { name: "Войти" }));

    // Проверки
    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(screen.getByText("Добро пожаловать!")).toBeInTheDocument();
    });
  });

  test("Ошибка авторизации", async () => {
    // Подготовка
    api.login.mockRejectedValue(new Error("Invalid credentials"));

    // Действия
    render(<AuthFlow />);
    // ... заполнение формы ...

    // Проверки
    await waitFor(() => {
      expect(screen.getByText("Неверные данные")).toBeInTheDocument();
    });
  });
});
```
