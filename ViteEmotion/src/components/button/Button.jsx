import { css } from 'emotion:extract';

const Button = () => {
  return (
    <button
      className={css`
        background-color: hotpink;
        &:hover {
          color: white;
        }
      `}
    >
      Click Me
    </button>
  );
};

export default Button;
