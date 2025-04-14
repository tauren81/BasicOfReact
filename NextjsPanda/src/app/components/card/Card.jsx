import { react } from 'react';
import styles from './Button.module.css';
import './globalStyle.css';

function Card() {
  return (
    <div>
      <div>
        <label>Заголовок</label>
      </div>
      <div>
        <content>Пусть тут будет что-то</content>
      </div>
      <div>
        <button type="button" className={styles.error}>
          Жмакни меня
        </button>
      </div>
    </div>
  );
}

export default Card;
