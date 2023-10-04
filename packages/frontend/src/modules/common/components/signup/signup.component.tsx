import React from 'react';
import { Field, Formik, FormikHelpers } from 'formik';
import * as Styled from './signup.styled';

import Input from '../input/input.component';
import Button from '../button/button.component';
import { FORMIK_CONST } from '../../consts/formik.const';
import { AuthType } from '../../types/student.types';
import { AuthSchema } from '../../../../schemas/auth.schema';
import { useAuthSignUp } from '../../hooks/useAuthQuery';

const SignUp = () => {
  const { signUp, isSuccess } = useAuthSignUp();

  const onSubmit = (user: AuthType, { resetForm }: FormikHelpers<AuthType>) => {
    signUp(user);
    resetForm();
  };

  if (isSuccess) {
    return <Styled.Success>Success Check Your Email</Styled.Success>;
  }

  return (
    <Formik initialValues={FORMIK_CONST.AUTH} validationSchema={AuthSchema} onSubmit={onSubmit}>
      {({ isValid, dirty }) => (
        <Styled.StyledForm>
          <Field name="email" placeholder="mail@.com" type="email" component={Input} />
          <Field name="password" placeholder="Password" type="password" component={Input} />
          <Button title="Submit" type="submit" disabled={!isValid || !dirty} />
        </Styled.StyledForm>
      )}
    </Formik>
  );
};

export default SignUp;
