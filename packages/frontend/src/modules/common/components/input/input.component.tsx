import React from 'react';
import { FieldProps } from 'formik';
import * as Styled from './input.styled';

const Input = ({ field, form, ...props }: FieldProps) => (
  <>
    <Styled.Input {...field} {...props} />
    <Styled.StyledErrorMessage component="span" name={field.name} />
  </>
);

export default Input;
