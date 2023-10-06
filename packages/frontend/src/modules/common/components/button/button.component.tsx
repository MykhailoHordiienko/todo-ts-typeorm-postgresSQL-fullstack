import React from 'react';
import * as Styled from './button.styled';
import { ButtonType } from '../../types/student.types';

const Button = ({ title, action, callBack, type, disabled = false, isActive }: ButtonType) => (
  <Styled.Button $isActive={isActive} onClick={action || callBack} type={type} disabled={disabled}>
    {title}
  </Styled.Button>
);

export default Button;
