import React from 'react';
import ToggleButton from '../toggleButton/toggleButton.component';
import Button from '../button/button.component';
import { TodoViewType } from '../../types/student.types';
import * as Styled from './todoView.styled';
import {
  useTodosUpdatePrivateMutation,
  useTodosUpdateStatusMutation
} from '../../hooks/useTodoQuery';

const TodoView = ({ description, id, isCompleted, title, personal, handleModal }: TodoViewType) => {
  const updatedTodoStatus = {
    id,
    description,
    title,
    isCompleted: !isCompleted,
    personal
  };
  const updatedTodoPrivate = {
    id,
    description,
    title,
    isCompleted,
    personal: !personal
  };

  const { upDateTodoStatus, updatingStatus } = useTodosUpdateStatusMutation(updatedTodoStatus);
  const { upDateTodoPrivate, updatingPrivate } = useTodosUpdatePrivateMutation(updatedTodoPrivate);

  return (
    <Styled.ViewContainer>
      <h2>{title}</h2>
      <h4>Description:</h4>
      <p>{description}</p>
      <Styled.ButtonContainer>
        <h4>Completed:</h4>
        <ToggleButton disabled={updatingStatus} status={isCompleted} action={upDateTodoStatus} />
      </Styled.ButtonContainer>
      <Styled.ButtonContainer>
        <h4>Private:</h4>
        <ToggleButton disabled={updatingPrivate} status={personal} action={upDateTodoPrivate} />
      </Styled.ButtonContainer>
      <Button disabled={false} type="button" action={handleModal} title="Back" />
    </Styled.ViewContainer>
  );
};

export default TodoView;
