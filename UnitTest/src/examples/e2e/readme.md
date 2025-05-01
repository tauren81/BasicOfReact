# End-to-End (E2E) тестирование

- Тестирование всего приложения в среде, максимально приближенной к реальной, с имитацией действий пользователя.

## Инструменты:

- Cypress — самый популярный инструмент для E2E в React
- Playwright — современная альтернатива от Microsoft
- Selenium — более старый, но всё ещё используемый инструмент

## Пример теста

```js
describe("User Registration Flow", () => {
  it("allows a user to register", () => {
    cy.visit("/register");
    cy.get('[data-testid="email"]').type("test@example.com");
    cy.get('[data-testid="password"]').type("password123");
    cy.get('[data-testid="submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome, test@example.com").should("be.visible");
  });
});
```

## Что тестировать?

- Критические пути приложения (регистрация, вход, покупка)

- Навигацию между страницами

- Работу с API в реальных условиях

- Состояние приложения после действий пользователя

- Кросс-браузерную совместимость (если нужно)
