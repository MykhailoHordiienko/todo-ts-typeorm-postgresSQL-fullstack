import React from 'react';
import * as Styled from './button.styled';
import { ButtonType } from '../../types/student.types';

const Button = ({ title, action, type, disabled = false }: ButtonType) => (
  <Styled.Button onClick={action} type={type} disabled={disabled}>
    {title}
  </Styled.Button>
);

export default Button;
