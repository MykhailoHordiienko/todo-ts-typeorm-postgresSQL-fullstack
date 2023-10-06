import React, { useState } from 'react';
import { TodoType } from '../../../types/student.types';
import * as Styled from './tabletTodoListItem.styled';
import Button from '../../button/button.component';
import ToggleButton from '../../toggleButton/toggleButton.component';
import Modal from '../../modal/modal.component';
import TodoView from '../../todoView/todoView.component';
import { useTodosDeleteMutation, useTodosUpdateStatusMutation } from '../../../hooks/useTodoQuery';

const TabletTodoListItem = ({ description, id, isCompleted, title, personal }: TodoType) => {
  const [isModal, setIsModal] = useState(false);

  const updatedTodo = {
    id,
    description,
    title,
    isCompleted: !isCompleted,
    personal
  };

  const { deleteTodo, deleting } = useTodosDeleteMutation(id);
  const { upDateTodoStatus, updatingStatus } = useTodosUpdateStatusMutation(updatedTodo);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <Styled.Item>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Description>{description}</Styled.Description>

        <Styled.Container>
          <Styled.ActionContainer>
            <Button type="button" title="View" action={handleModal} />
            <Button disabled={deleting} type="button" title="Delete" action={deleteTodo} />
          </Styled.ActionContainer>
          <Styled.ToggleContainer>
            <ToggleButton
              disabled={updatingStatus}
              status={isCompleted}
              action={upDateTodoStatus}
            />
          </Styled.ToggleContainer>
        </Styled.Container>
      </Styled.Item>
      <Modal isActive={isModal} toggleModal={handleModal}>
        <TodoView
          description={description}
          handleModal={handleModal}
          id={id}
          isCompleted={isCompleted}
          title={title}
          personal={personal}
        />
      </Modal>
    </>
  );
};

export default TabletTodoListItem;
