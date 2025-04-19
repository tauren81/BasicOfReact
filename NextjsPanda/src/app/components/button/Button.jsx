import ButtonCVA from './ButtonCVA';

const Button = () => {
  return (
    <button className={ButtonCVA({ visual: 'solid', size: 'sm' })}>
      Click Me
    </button>
  );
};

export default Button;
