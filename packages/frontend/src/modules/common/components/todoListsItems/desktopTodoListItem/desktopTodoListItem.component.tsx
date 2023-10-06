import React, { useState } from 'react';
import { TodoType } from '../../../types/student.types';
import Button from '../../button/button.component';
import ToggleButton from '../../toggleButton/toggleButton.component';
import * as Styled from './desktopTodoListItem.styled';
import Modal from '../../modal/modal.component';
import TodoView from '../../todoView/todoView.component';
import { useTodosDeleteMutation, useTodosUpdateStatusMutation } from '../../../hooks/useTodoQuery';

const DesktopTodoListItem = ({ description, id, isCompleted, title, personal }: TodoType) => {
  const [isModal, setIsModal] = useState(false);

  const updatedTodoStatus = {
    id,
    description,
    title,
    isCompleted: !isCompleted,
    personal
  };

  const { deleteTodo, deleting } = useTodosDeleteMutation(id);
  const { upDateTodoStatus, updatingStatus } = useTodosUpdateStatusMutation(updatedTodoStatus);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <tr>
        <Styled.Td>{title}</Styled.Td>
        <Styled.Td>{description}</Styled.Td>
        <Styled.Td>
          <Styled.ButtonContainer>
            <Button type="button" title="View" action={handleModal} />
            <Button disabled={deleting} type="button" title="Delete" action={deleteTodo} />
            <ToggleButton
              status={isCompleted}
              disabled={updatingStatus}
              action={upDateTodoStatus}
            />
          </Styled.ButtonContainer>
        </Styled.Td>
      </tr>
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

export default DesktopTodoListItem;
