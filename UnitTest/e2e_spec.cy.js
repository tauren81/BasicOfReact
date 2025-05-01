describe('E2E Tests', () => {
  it('Добавление задачи', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="todo-input"]').type('Добавление задачи');
    cy.get('[data-testid="add-button"]').click();
    cy.get('span').should('contain.text', 'Добавление задачи');
  });

  it('Удаление задачи', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="todo-input"]').type('Удаление задачи');
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="todo-input"]').should('have.attr', 'value', '');
  });

  it('Добавление задач и фильтрация', () => {
    cy.visit('http://localhost:5173/');

    // Добавление активной задачи
    cy.get('[data-testid="todo-input"]').type('Активная задача 1');
    cy.get('[data-testid="add-button"]').click();

    // Добавление выполненной задачи
    cy.get('[data-testid="todo-input"]').type('Выполненная задача 1');
    cy.get('[data-testid="add-button"]').click();

    // Ожидание появления последнего элемента перед кликом
    cy.get('[data-testid^="toggle-"]').should('have.length.at.least', 4); // Убедиться, что есть хотя бы 2 задачи
    cy.get('[data-testid^="toggle-"]').last().click();

    // Добавление ещё одной активной задачи
    cy.get('[data-testid="todo-input"]').type('Активная задача 2');
    cy.get('[data-testid="add-button"]').click();

    // Проверка фильтра "Только активные"
    cy.get('[data-testid="filter-active"]').click();
    cy.get('[data-testid="todo-list"]', { timeout: 10000 }).should(
      'contain.text',
      'Активная задача 1',
    );
    cy.get('[data-testid="todo-list"]').should(
      'contain.text',
      'Активная задача 2',
    );
    cy.get('[data-testid="todo-list"]').should(
      'not.contain.text',
      'Выполненная задача 1',
    );

    // Проверка фильтра "Только выполненные"
    cy.get('[data-testid="filter-completed"]').click();
    cy.get('[data-testid="todo-list"]', { timeout: 10000 }).should(
      'contain.text',
      'Выполненная задача 1',
    );
    cy.get('[data-testid="todo-list"]').should(
      'not.contain.text',
      'Активная задача 1',
    );
    cy.get('[data-testid="todo-list"]').should(
      'not.contain.text',
      'Активная задача 2',
    );
  });
});
