import React from 'react';
import ToggleButton from '../toggleButton/toggleButton.component';
import Button from '../button/button.component';
import { TodoViewType } from '../../types/student.types';
import * as Styled from './todoView.styled';
import { useTodosUpdateMutation } from '../../hooks/useTodoQuery';

const TodoView = ({ description, id, isCompleted, title, handleModal }: TodoViewType) => {
  const updatedTodo = {
    id,
    description,
    title,
    isCompleted: !isCompleted
  };

  const { upDateTodo, updating } = useTodosUpdateMutation(updatedTodo);

  return (
    <Styled.ViewContainer>
      <h2>
        {title}
        {id}
      </h2>
      <h4>Description:</h4>
      <p>{description}</p>
      <Styled.ButtonContainer>
        <h4>Completed:</h4>
        <ToggleButton disabled={updating} status={isCompleted} action={upDateTodo} />
      </Styled.ButtonContainer>
      <Styled.ButtonContainer>
        <h4>Private:</h4>
        <ToggleButton status={isCompleted} action={upDateTodo} />
      </Styled.ButtonContainer>
      <Button disabled={false} type="button" action={handleModal} title="Back" />
    </Styled.ViewContainer>
  );
};

export default TodoView;
