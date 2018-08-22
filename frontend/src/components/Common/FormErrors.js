import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div.attrs({
  className: 'ba br2 pa3 ma2 b--red tl'
})``;

const FormErrors = ({formErrors}) => (
  <StyledContainer>
    {Object.keys(formErrors).map((fieldName, i) => (
      <p key={i}>{fieldName}: {formErrors[fieldName]}</p>
    ))}
  </StyledContainer>
);

export default FormErrors;