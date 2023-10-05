import React from 'react';
import * as Styled from './error.styled';
import DefaultJpeg from '../../../../assets/image/defaultImg.jpeg';

const Error = ({ title = 'Something go wrong, reload please...' }) => (
  <Styled.ErrorContainer>
    <Styled.ErrorTitle>{title}</Styled.ErrorTitle>
    <Styled.ErrorImg src={DefaultJpeg} alt="error" />
  </Styled.ErrorContainer>
);
export default Error;
