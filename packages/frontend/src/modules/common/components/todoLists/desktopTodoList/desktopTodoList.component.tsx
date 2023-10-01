import React from 'react';
import { TodoListType } from '../../../types/student.types';
import * as Styled from './desktopTodoList.styled';
import DesktopTodoListItem from '../../todoListsItems/desktopTodoListItem/desktopTodoListItem.component';

const DesktopTodoList = ({ todos }: TodoListType) => (
  <Styled.Table>
    <Styled.Thead>
      <tr>
        <th>Todo Title</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </Styled.Thead>

    <Styled.Tbody>
      {todos.map(({ description, id, isCompleted, title }) => (
        <DesktopTodoListItem
          key={id}
          description={description}
          id={id}
          isCompleted={isCompleted}
          title={title}
        />
      ))}
    </Styled.Tbody>
  </Styled.Table>
);

export default DesktopTodoList;
