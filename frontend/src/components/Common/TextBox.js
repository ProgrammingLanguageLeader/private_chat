import styled from 'styled-components';

const TextBox = styled.input.attrs({
  className: 'white br1 pa3 ba b--gray w-100'
})`
  letter-spacing: 0.2em;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default TextBox;