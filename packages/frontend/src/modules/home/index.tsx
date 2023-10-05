import React, { useState } from 'react';
import Container from '../common/components/container/container.component';
import AddTodo from '../common/components/addTodo/addTodo.component';
import Modal from '../common/components/modal/modal.component';
import MobileTodoList from '../common/components/todoLists/mobileTodoList/mobileTodoList.component';
import TabletTodoList from '../common/components/todoLists/tabletTodoList/tabletTodoList.component';
import DesktopTodoList from '../common/components/todoLists/desktopTodoList/desktopTodoList.component';
import useScreenSize from '../common/hooks/useScreenSize';
import { IComponents } from '../common/types/student.types';
import { useTodosQuery } from '../common/hooks/useTodoQuery';
import Error from '../common/components/error/error.component';
import Loader from '../common/components/loader/loader.component';
import Profile from '../common/components/profile/profile.component';
import { useLogOutUser } from '../common/hooks/useAuthQuery';
import Filter from '../common/components/filter/filter.component';
import HomeButtons from '../common/components/homeButtons/homeButtons.component';

const Components: IComponents = {
  mobile: MobileTodoList,
  tablet: TabletTodoList,
  desktop: DesktopTodoList
};

const HomePageContainer = () => {
  const [isModal, setIsModal] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const devise = useScreenSize();

  const { data, isSuccess, isLoading, isError } = useTodosQuery();
  const { logOut } = useLogOutUser();

  const toggleModal = () => {
    setIsModal(!isModal);
    setIsProfile(false);
  };
  const toggleProfile = () => {
    setIsProfile(!isProfile);
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
            <HomeButtons
              isSuccess={isSuccess}
              logOut={logOut}
              toggleModal={toggleModal}
              toggleProfile={toggleProfile}
            />
          </Container>
          <Container>
            <Filter isSuccess={isSuccess} />
          </Container>
          <Container>{isLoading ? <Loader /> : data && <Component todos={data} />}</Container>
        </>
      )}
      <Modal isActive={isModal} toggleModal={toggleModal} closeButton>
        {isProfile ? <Profile toggleModal={toggleModal} /> : <AddTodo toggleModal={toggleModal} />}
      </Modal>
    </>
  );
};
export default HomePageContainer;
