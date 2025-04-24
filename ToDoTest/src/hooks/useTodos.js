import { useState, useEffect } from 'react';
import { getTodos, addTodo as apiAddTodo, updateTodo, deleteTodo as apiDeleteTodo } from '../api/todosApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const newTodo = await apiAddTodo(text);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError(err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = await updateTodo(id, { 
        completed: !todoToUpdate.completed 
      });
      
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await apiDeleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return { todos, addTodo, toggleTodo, deleteTodo, loading, error };
}