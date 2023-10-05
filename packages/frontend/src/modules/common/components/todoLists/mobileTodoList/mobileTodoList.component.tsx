import React from 'react';
import { TodoListType } from '../../../types/student.types';
import MobileTodoListItem from '../../todoListsItems/mobileTodoListItem/mobileTodoListItem.component';
import * as Styled from './mobileTodoList.styled';
import Error from '../../error/error.component';

const MobileTodoList = ({ todos }: TodoListType) =>
  todos.length <= 0 ? (
    <Error title="Add TODO!" />
  ) : (
    <Styled.List>
      {todos.map(({ description, id, isCompleted, title, personal }) => (
        <MobileTodoListItem
          key={id}
          description={description}
          id={id}
          isCompleted={isCompleted}
          title={title}
          personal={personal}
        />
      ))}
    </Styled.List>
  );

export default MobileTodoList;
