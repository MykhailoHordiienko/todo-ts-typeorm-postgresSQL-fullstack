import React, { useState } from 'react';
import { TodoType } from '../../../types/student.types';
import * as Styled from './tabletTodoListItem.styled';
import Button from '../../button/button.component';
import ToggleButton from '../../toggleButton/toggleButton.component';
import Modal from '../../modal/modal.component';
import TodoView from '../../todoView/todoView.component';
import { useTodosDeleteMutation, useTodosUpdateMutation } from '../../../hooks/useTodoQuery';

const TabletTodoListItem = ({ description, id, isCompleted, title }: TodoType) => {
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
      <Styled.Item>
        <Styled.Title>
          {title}
          {id}
        </Styled.Title>
        <Styled.Description>{description}</Styled.Description>

        <Styled.Container>
          <Styled.ActionContainer>
            <Button type="button" title="View" action={handleModal} />
            <Button disabled={deleting} type="button" title="Delete" action={handleDeleteTodo} />
          </Styled.ActionContainer>
          <Styled.ToggleContainer>
            <ToggleButton disabled={updating} status={isCompleted} action={handleUpdateTodo} />
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
        />
      </Modal>
    </>
  );
};

export default TabletTodoListItem;
