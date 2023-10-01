import { object, string } from 'yup';

export const TodoSchema = object().shape({
  title: string()
    .min(4, 'Minimum 4 characters')
    .max(20, 'Maximum 20 characters')
    .required('Enter a title'),
  description: string()
    .min(10, 'Minimum 10 characters')
    .max(200, 'Maximum 200 characters')
    .required('Enter a description')
});
