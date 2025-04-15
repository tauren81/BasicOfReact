import { react } from 'react';
import './Card.css';
import Button from '@components/button/Button';

function Card() {
  return (
    <div>
      <div>
        <label className="text-xl font-semibold text-gray-900 dark:text-white">
          Заголовок
        </label>
      </div>
      <div>
        <content className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          Пусть тут будет что-то
        </content>
      </div>
      <div>
        <Button />
      </div>
    </div>
  );
}

export default Card;
