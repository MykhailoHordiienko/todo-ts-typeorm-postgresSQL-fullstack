import React, { useEffect } from 'react';
import { Field, Formik, FormikHelpers } from 'formik';
import * as Styled from './profile.styled';
import { AddModalType, UpdateAuthType } from '../../types/student.types';
import Input from '../input/input.component';
import Button from '../button/button.component';
import { FORMIK_CONST } from '../../consts/formik.const';
import { useUpdateUser } from '../../hooks/useAuthQuery';
import { UpDateAuthSchema } from '../../../../schemas/auth.schema';

const Profile = ({ toggleModal }: AddModalType) => {
  const { updateUser, isSuccess } = useUpdateUser();
  const onSubmit = (user: UpdateAuthType, { resetForm }: FormikHelpers<UpdateAuthType>) => {
    updateUser(user);
    resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      if (toggleModal) {
        toggleModal();
      }
    }
  }, [isSuccess]);

  return (
    <>
      <h2>Profile: Change Password</h2>
      <Formik
        initialValues={FORMIK_CONST.UPDATE_AUTH}
        validationSchema={UpDateAuthSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty }) => (
          <Styled.StyledForm>
            <Field name="email" placeholder="mail@.com" type="email" component={Input} />
            <Field
              name="password"
              placeholder="Current-Password"
              type="password"
              component={Input}
            />
            <Field
              name="newPassword"
              placeholder="New-Password"
              type="password"
              component={Input}
            />
            <Button title="Submit" type="submit" disabled={!isValid || !dirty} />
          </Styled.StyledForm>
        )}
      </Formik>
    </>
  );
};

export default Profile;
