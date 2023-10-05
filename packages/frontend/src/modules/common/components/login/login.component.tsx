import React from 'react';
import { Field, Formik, FormikHelpers } from 'formik';
import * as Styled from './login.styled';

import Input from '../input/input.component';
import Button from '../button/button.component';
import { FORMIK_CONST } from '../../consts/formik.const';
import { AuthType } from '../../types/student.types';
import { AuthSchema } from '../../../../schemas/auth.schema';
import { useAuthSignIn } from '../../hooks/useAuthQuery';

const LogIn = () => {
  const { signIn } = useAuthSignIn();
  const onSubmit = (user: AuthType, { resetForm }: FormikHelpers<AuthType>) => {
    signIn(user);
    resetForm();
  };

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

export default LogIn;
