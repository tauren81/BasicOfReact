// В реальном приложении здесь были бы настоящие API вызовы
// Для тестов мы замокаем этот модуль с помощью MSW

const API_URL = 'https://api.example.com/todos';

let todos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Write tests', completed: false },
];

const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, 100));

export const getTodos = async () => {
  await simulateNetworkDelay();
  return [...todos];
};

export const addTodo = async (text) => {
  await simulateNetworkDelay();
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  return newTodo;
};

export const updateTodo = async (id, updates) => {
  await simulateNetworkDelay();
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) throw new Error('Todo not found');
  todos[index] = { ...todos[index], ...updates };
  return todos[index];
};

export const deleteTodo = async (id) => {
  await simulateNetworkDelay();
  todos = todos.filter(todo => todo.id !== id);
};