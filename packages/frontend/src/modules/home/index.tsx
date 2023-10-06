import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../common/components/container/container.component';
import AddTodo from '../common/components/addTodo/addTodo.component';
import Modal from '../common/components/modal/modal.component';
import MobileTodoList from '../common/components/todoLists/mobileTodoList/mobileTodoList.component';
import TabletTodoList from '../common/components/todoLists/tabletTodoList/tabletTodoList.component';
import DesktopTodoList from '../common/components/todoLists/desktopTodoList/desktopTodoList.component';
import useScreenSize from '../common/hooks/useScreenSize';
import { IComponents, TodoType } from '../common/types/student.types';
import { useTodosQuery } from '../common/hooks/useTodoQuery';
import Error from '../common/components/error/error.component';
import Loader from '../common/components/loader/loader.component';
import Profile from '../common/components/profile/profile.component';
import { useAuthCurrent, useLogOutUser } from '../common/hooks/useAuthQuery';
import Filter from '../common/components/filter/filter.component';
import HomeButtons from '../common/components/homeButtons/homeButtons.component';

const Components: IComponents = {
  mobile: MobileTodoList,
  tablet: TabletTodoList,
  desktop: DesktopTodoList
};

const HomePageContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pageNumber = '1' } = Object.fromEntries([...searchParams]);

  const [isModal, setIsModal] = useState(false);
  const [todos, setTodos] = useState<TodoType[] | undefined>();
  const [isProfile, setIsProfile] = useState(false);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [totalTodos, setTotalTodos] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(() => parseInt(pageNumber, 10));

  const devise = useScreenSize();

  const { data, isSuccess, isLoading, isError } = useTodosQuery();

  useEffect(() => {
    setPageTotal(data?.totalPages ?? 0);
    setTotalTodos(data?.totalCount ?? 0);
    setTodos(data?.todos);
  }, [data]);

  useEffect(() => {
    setSearchParams({ pageNumber: currentPage.toString() });
  }, [currentPage]);

  const { isLoading: isRefreshing } = useAuthCurrent();

  const { logOut } = useLogOutUser();

  const toggleModal = () => {
    setIsModal(!isModal);
    setIsProfile(false);
  };
  const toggleProfile = () => {
    setIsProfile(!isProfile);
    setIsModal(!isModal);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleCurrentPage = () => {
    setCurrentPage(1);
  };

  const Component = Components[devise];

  if (isRefreshing) {
    return <Loader />;
  }

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
          <Container>
            {isLoading ? (
              <Loader />
            ) : (
              todos && (
                <Component
                  todos={todos}
                  nextPage={handleNextPage}
                  prevPage={handlePrevPage}
                  handleCurrentPage={handleCurrentPage}
                  pageTotal={pageTotal}
                  currentPage={currentPage}
                  totalTodos={totalTodos}
                />
              )
            )}
          </Container>
        </>
      )}
      <Modal isActive={isModal} toggleModal={toggleModal} closeButton>
        {isProfile ? <Profile toggleModal={toggleModal} /> : <AddTodo toggleModal={toggleModal} />}
      </Modal>
    </>
  );
};
export default HomePageContainer;
