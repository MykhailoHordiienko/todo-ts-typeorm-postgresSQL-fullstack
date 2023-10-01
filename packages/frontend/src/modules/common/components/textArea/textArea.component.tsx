import React from 'react';
import { FieldProps } from 'formik';
import * as Styled from './textArea.styled';

const TextArea = ({ field, form, ...props }: FieldProps) => (
  <>
    <Styled.TextArea {...field} {...props} />
    <Styled.StyledErrorMessage component="span" name={field.name} />
  </>
);

export default TextArea;
