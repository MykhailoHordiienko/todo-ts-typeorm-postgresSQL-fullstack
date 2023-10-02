import React from 'react';
import { TodoListType } from '../../../types/student.types';
import MobileTodoListItem from '../../todoListsItems/mobileTodoListItem/mobileTodoListItem.component';
import * as Styled from './mobileTodoList.styled';

const MobileTodoList = ({ todos }: TodoListType) => (
  <Styled.List>
    {todos.map(({ description, id, isCompleted, title }) => (
      <MobileTodoListItem
        key={id}
        description={description}
        id={id}
        isCompleted={isCompleted}
        title={title}
      />
    ))}
  </Styled.List>
);

export default MobileTodoList;
