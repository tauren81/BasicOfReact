import { react } from 'react';
import './Card.css';
import ButtonStyled from '@components/button/ButtonStyled';

const Card = () => {
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
        <ButtonStyled primary>3333333</ButtonStyled>
      </div>
      <div>
        <ButtonStyled outline>4444444</ButtonStyled>
      </div>
    </div>
  );
};

export default Card;
