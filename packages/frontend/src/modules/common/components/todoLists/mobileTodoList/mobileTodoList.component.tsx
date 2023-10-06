import React from 'react';
import { TodoListType } from '../../../types/student.types';
import MobileTodoListItem from '../../todoListsItems/mobileTodoListItem/mobileTodoListItem.component';
import * as Styled from './mobileTodoList.styled';
import Error from '../../error/error.component';
import Button from '../../button/button.component';

const MobileTodoList = ({
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
      <Styled.ButtonsContainer>
        <p>Total Pages: {pageTotal}</p>
        <p>Current Page: {currentPage}</p>
        <Button title="Prev" type="button" disabled={currentPage <= 1} action={prevPage} />
        <Button title="Next" type="button" disabled={currentPage >= pageTotal} action={nextPage} />
      </Styled.ButtonsContainer>
    </>
  );

export default MobileTodoList;
