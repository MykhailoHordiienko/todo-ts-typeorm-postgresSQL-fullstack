import React from 'react';
import { Field, Formik, FormikHelpers } from 'formik';
import * as Styled from './addTodo.styled';
import { AddTodoComponentType, AddTodoType } from '../../types/student.types';
import { TodoSchema } from '../../../../schemas/addTodo.schema';
import Input from '../input/input.component';
import TextArea from '../textArea/textArea.component';
import Button from '../button/button.component';
import { useTodosAddMutation } from '../../hooks/useTodoQuery';

const AddTodo = ({ toggleModal }: AddTodoComponentType) => {
  const { mutate: addTodo } = useTodosAddMutation();

  const initialFormikValues = {
    title: '',
    description: ''
  };
  const onSubmit = (todo: AddTodoType, { resetForm }: FormikHelpers<AddTodoType>) => {
    addTodo(todo);
    resetForm();
    if (toggleModal) {
      toggleModal();
    }
  };

  return (
    <>
      <h2>Add Todo</h2>
      <Formik initialValues={initialFormikValues} validationSchema={TodoSchema} onSubmit={onSubmit}>
        {({ isValid, dirty }) => (
          <Styled.StyledForm>
            <Field name="title" placeholder="Title" type="text" component={Input} />
            <Field name="description" placeholder="Description" type="text" component={TextArea} />
            <Button title="Submit" type="submit" disabled={!isValid || !dirty} />
          </Styled.StyledForm>
        )}
      </Formik>
    </>
  );
};

export default AddTodo;
