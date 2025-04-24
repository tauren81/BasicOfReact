// services/api.js
const API_BASE_URL = 'https://api.example.com'; // Базовый URL вашего API

const api = {
  /**
   * Получает данные пользователя по ID
   * @param {number|string} userId - ID пользователя
   * @returns {Promise<Object>} - Данные пользователя
   * @throws {Error} - Ошибка при запросе
   */
  async getUser(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        // Можно добавить авторизационные заголовки при необходимости
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
  },

  // Другие методы API могут быть добавлены здесь
  // getPosts, createUser, etc.
};

export default api;