import styled from '@emotion/styled';

const Button = styled.button`
  color: ${(props) => (props.primary ? 'white' : '#3498db')};
  font-size: 1.5rem;
  background-color: ${(props) => (props.primary ? '#3498db' : 'transparent')};
  padding: 10px 30px;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
`;

const ButtonStyled = (props) => {
  return props.primary ? (
    <Button primary>1111111</Button>
  ) : (
    <Button outline>2222222</Button>
  );
};

export default ButtonStyled;
