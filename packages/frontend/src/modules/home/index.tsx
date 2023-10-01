import React, { useState } from 'react';
import Container from '../common/components/container/container.component';
import AddTodo from '../common/components/addTodo/addTodo.component';
import Modal from '../common/components/modal/modal.component';
import Button from '../common/components/button/button.component';
import * as Styled from './homePageContainer.styled';

import MobileTodoList from '../common/components/todoLists/mobileTodoList/mobileTodoList.component';
import TabletTodoList from '../common/components/todoLists/tabletTodoList/tabletTodoList.component';
import DesktopTodoList from '../common/components/todoLists/desktopTodoList/desktopTodoList.component';
import useScreenSize from '../common/hooks/useScreenSize';
import { IComponents } from '../common/types/student.types';
import { useTodosQuery } from '../common/hooks/useTodoQuery';
import { QUERY_KEYS } from '../common/consts/app-keys.const';
import Error from '../common/components/error/error.component';
import Loader from '../common/components/loader/loader.component';

const Components: IComponents = {
  mobile: MobileTodoList,
  tablet: TabletTodoList,
  desktop: DesktopTodoList
};

const HomePageContainer = () => {
  const [isModal, setIsModal] = useState(false);
  const devise = useScreenSize();

  const { data, isSuccess, isLoading, isError } = useTodosQuery(QUERY_KEYS.STATE, QUERY_KEYS.ALL);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const Component = Components[devise];

  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <>
          <Container>
            <Styled.ButtonsContainer>
              <Button disabled={!isSuccess} type="button" title="Add Todo" action={toggleModal} />
              <Button disabled={!isSuccess} type="button" title="Profile" action={toggleModal} />
            </Styled.ButtonsContainer>
          </Container>
          <Container>{isLoading ? <Loader /> : isSuccess && <Component todos={data} />}</Container>
        </>
      )}
      <Modal isActive={isModal} toggleModal={toggleModal} closeButton>
        <AddTodo toggleModal={toggleModal} />
      </Modal>
    </>
  );
};
export default HomePageContainer;
