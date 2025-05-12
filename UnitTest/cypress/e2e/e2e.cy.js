describe('E2E Tests', () => {
  it('Add Task', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="todo-input"]').type('Add Task');
    cy.get('[data-testid="add-button"]').click();
    cy.get('span').should('contain.text', 'Add Task');
  });

  it('Delete task', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="todo-input"]').type('Delete task');
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="todo-input"]').should('have.attr', 'value', '');
  });

  it('Filter', () => {
    cy.visit('http://localhost:5173/');

    // Добавление активной задачи
    cy.get('[data-testid="todo-input"]').type('Todo task x');
    cy.get('[data-testid="add-button"]').click();

    // Добавление выполненной задачи
    cy.get('[data-testid="todo-input"]').type('Done task x');
    cy.get('[data-testid="add-button"]').click();

    // Ожидание появления последнего элемента перед кликом
    cy.get('[data-testid^="toggle-"]').should('have.length.at.least', 4); // Убедиться, что есть хотя бы 2 задачи
    cy.get('[data-testid^="toggle-"]').last().click();

    // Добавление ещё одной активной задачи
    cy.get('[data-testid="todo-input"]').type('Todo task y');
    cy.get('[data-testid="add-button"]').click();

    // Проверка фильтра "Только активные"
    cy.get('[data-testid="filter-active"]').click();
    cy.get('[data-testid="todo-list"]', { timeout: 10000 }).should(
      'contain.text',
      'Todo task x',
    );
    cy.get('[data-testid="todo-list"]').should('contain.text', 'Todo task y');
    cy.get('[data-testid="todo-list"]').should(
      'not.contain.text',
      'Done task x',
    );

    // Проверка фильтра "Только выполненные"
    cy.get('[data-testid="filter-completed"]').click();
    cy.get('[data-testid="todo-list"]', { timeout: 10000 }).should(
      'contain.text',
      'Done task x',
    );
    cy.get('[data-testid="todo-list"]').should(
      'not.contain.text',
      'Todo task x',
    );
    cy.get('[data-testid="todo-list"]').should(
      'not.contain.text',
      'Todo task y',
    );
  });
});
