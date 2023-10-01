import React, { useState } from 'react';
import { TodoType } from '../../../types/student.types';
import Button from '../../button/button.component';
import ToggleButton from '../../toggleButton/toggleButton.component';
import * as Styled from './desktopTodoListItem.styled';
import Modal from '../../modal/modal.component';
import TodoView from '../../todoView/todoView.component';
import { useTodosDeleteMutation, useTodosUpdateMutation } from '../../../hooks/useTodoQuery';

const DesktopTodoListItem = ({ description, id, isCompleted, title }: TodoType) => {
  const [isModal, setIsModal] = useState(false);

  const { mutate: deleteTodo, isLoading: deleting } = useTodosDeleteMutation();
  const { mutate: upDateTodo, isLoading: updating } = useTodosUpdateMutation();

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleDeleteTodo = () => deleteTodo(id);
  const handleUpdateTodo = () => {
    const updatedTodo = {
      id,
      description,
      title,
      isCompleted: !isCompleted
    };

    upDateTodo(updatedTodo);
  };

  return (
    <>
      <tr>
        <Styled.Td>{title}</Styled.Td>
        <Styled.Td>{description}</Styled.Td>
        <Styled.Td>
          <Styled.ButtonContainer>
            <Button type="button" title="View" action={handleModal} />
            <Button disabled={deleting} type="button" title="Delete" action={handleDeleteTodo} />
            <ToggleButton status={isCompleted} disabled={updating} action={handleUpdateTodo} />
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
        />
      </Modal>
    </>
  );
};

export default DesktopTodoListItem;
