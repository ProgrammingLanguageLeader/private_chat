import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyLink = styled(Link)`
  text-decoration: none;
`;

const StyledHeader = styled.h1.attrs({
  className: 'ma4 white'
})``;

const Logo = () => {
  return (
    <MyLink to="/sign_in">
      <StyledHeader>
        Animated Logo. Click On Me! (this is temporary)
      </StyledHeader>
    </MyLink>
  );
}

export default Logo;