import { useState, useEffect } from 'react';
//import { API_KEY, API_URL_LIST } from '../config';
import Preloader from './Preloader';
import ShopCard from './ShopCard';
import Items from '@/assets/items/Items.json';
import useStore from '../stores/ZustandContext';

export default function ShopList(props) {
  //const [items, setItems] = useState([]); // товары магазина
  const { products, filters, setFilters, clearFilters, setProduct } =
    useStore(); // товары магазина
  const [loading, setLoading] = useState(true); // идет загрузка?

  // Фильтрация продуктов
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesPrice = !filters.maxPrice || product.price <= filters.maxPrice;
    return matchesCategory && matchesPrice;
  });

  // Получаем все уникальные категории
  const categories = [...new Set(products.map((product) => product.category))];

  useEffect(() => {
    /*
    fetch(API_URL_LIST, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.items && setItems(data.items.slice(0, 24));
        setLoading(false);
      });
*/
    //setItems(Items.slice(0, 24));
    setProduct(Items.slice(0, 24));
    setLoading(false);
  }, []);

  return (
    <div className="product-catalog">
      <div className="filters">
        <h3>Фильтры</h3>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="price-filter">
          <label>Максимальная цена:</label>
          <input
            type="range"
            min="0"
            max="10000"
            step="10"
            value={filters.maxPrice || 1000}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
          />
          <span>${filters.maxPrice || '∞'}</span>
        </div>

        <button onClick={clearFilters}>Сбросить фильтры</button>
      </div>

      <div className="items">
        {loading ? (
          <Preloader />
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((item) => <ShopCard key={item.id} {...item} />)
        ) : (
          <p>Не удалось загрузить список</p>
        )}
      </div>
    </div>
  );
}
