import styled from '@emotion/styled';

const Button = styled.button`
  color: ${(props) => (props.primary ? 'white' : '#3498db')};
  font-size: 1.5rem;
  background-color: ${(props) => (props.primary ? '#3498db' : 'transparent')};
  padding: 10px 30px;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
`;
function ButtonStyled({ props }) {
  return props ? (
    <Button primary>tttttttt</Button>
  ) : (
    <Button outline>tttttttt</Button>
  );
}

export default ButtonStyled;
