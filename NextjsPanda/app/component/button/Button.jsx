import { button } from './buttonStyle';

const Button = () => {
  return (
    <button className={button({ visual: 'solid', size: 'lg' })}>
      Click Me
    </button>
  );
};

export default Button;
