import React from 'react';
import { TodoListType } from '../../../types/student.types';
import * as Styled from './desktopTodoList.styled';
import DesktopTodoListItem from '../../todoListsItems/desktopTodoListItem/desktopTodoListItem.component';
import Error from '../../error/error.component';
import Button from '../../button/button.component';

const DesktopTodoList = ({
  todos,
  nextPage,
  prevPage,
  pageTotal = 0,
  currentPage = 0
}: TodoListType) =>
  todos.length <= 0 ? (
    <Error title="Nothing to show" />
  ) : (
    <>
      <Styled.Table>
        <Styled.Thead>
          <tr>
            <th>Todo Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </Styled.Thead>
        <Styled.Tbody>
          {todos.map(({ description, id, isCompleted, title, personal }) => (
            <DesktopTodoListItem
              key={id}
              description={description}
              id={id}
              isCompleted={isCompleted}
              title={title}
              personal={personal}
            />
          ))}
        </Styled.Tbody>
      </Styled.Table>
      <Styled.ButtonsContainer>
        <Button title="Prev" type="button" disabled={currentPage <= 1} action={prevPage} />
        <p>Total Pages: {pageTotal}</p>
        <p>Current Page: {currentPage}</p>
        <Button title="Next" type="button" disabled={currentPage >= pageTotal} action={nextPage} />
      </Styled.ButtonsContainer>
    </>
  );

export default DesktopTodoList;
