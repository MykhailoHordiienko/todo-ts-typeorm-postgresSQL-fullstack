import React from 'react';
import * as Styled from './error.styled';
import DefaultJpeg from '../../../../assets/image/defaultImg.jpeg';

const Error = () => (
  <Styled.ErrorContainer>
    <Styled.ErrorTitle>Something go wrong, reload please...</Styled.ErrorTitle>
    <Styled.ErrorImg src={DefaultJpeg} alt="error" />
  </Styled.ErrorContainer>
);
export default Error;
