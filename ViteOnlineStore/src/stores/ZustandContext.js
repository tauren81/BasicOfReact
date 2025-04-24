import { create } from 'zustand';

const useStore = create((set) => ({
  products: [
    {
      id: 1,
      name: 'Ноутбук',
      price: 999.99,
      category: 'Электроника',
      description: 'Мощный ноутбук для работы и игр',
    },
    {
      id: 2,
      name: 'Смартфон',
      price: 699.99,
      category: 'Электроника',
      description: 'Новейший смартфон с отличной камерой',
    },
    {
      id: 3,
      name: 'Наушники',
      price: 149.99,
      category: 'Электроника',
      description: 'Беспроводные наушники с шумоподавлением',
    },
    {
      id: 4,
      name: 'Футболка',
      price: 19.99,
      category: 'Одежда',
      description: 'Хлопковая футболка с принтом',
    },
    {
      id: 5,
      name: 'Джинсы',
      price: 49.99,
      category: 'Одежда',
      description: 'Классические синие джинсы',
    },
  ],
  cart: [],
  filters: {
    category: '',
    maxPrice: 0,
  },

  // Добавление товара в корзину
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  // Удаление товара из корзины
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  // Обновление количества товара
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    })),

  // Установка фильтров
  setFilters: (filters) => set({ filters }),

  // Очистка фильтров
  clearFilters: () => set({ filters: { category: '', maxPrice: 0 } }),
}));

export default useStore;
