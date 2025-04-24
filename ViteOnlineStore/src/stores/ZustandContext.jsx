import { create } from 'zustand';

const useStore = create((set) => ({
  products: [
    /*
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
    */
  ],
  filters: {
    category: '',
    maxPrice: 0,
  },

  // Установка фильтров
  setFilters: (filters) => set({ filters }),

  // Очистка фильтров
  clearFilters: () => set({ filters: { category: '', maxPrice: 0 } }),

  setProduct: (products) => set({ products }),
}));

export default useStore;
