import { object, string } from 'yup';
import { REGEEX } from '../modules/common/consts/regex';

export const AuthSchema = object().shape({
  email: string()
    .email()
    .min(3, 'Minimum 4 characters')
    .max(50, 'Maximum 50 characters')
    .required('Enter Email'),
  password: string()
    .min(3, 'Minimum 3 characters')
    .max(10, 'Maximum 10 characters')
    .matches(REGEEX.PASSWORD, REGEEX.PSSWORD_DESCRIPTION)
    .required('Enter Password')
});
