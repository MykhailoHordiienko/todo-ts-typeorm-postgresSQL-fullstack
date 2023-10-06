import React, { useEffect, useState } from 'react';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useSearchParams } from 'react-router-dom';
import * as Styled from './tabletTodoList.styled';
import 'swiper/css';
import 'swiper/css/pagination';
import { TodoListType } from '../../../types/student.types';
import TabletTodoListItem from '../../todoListsItems/tabletTodoListItem/tabletTodoListItem.component';
import Error from '../../error/error.component';
import { useTodosQuery } from '../../../hooks/useTodoQuery';

const TabletTodoList = ({
  todos,
  totalTodos = 0,
  pageTotal = 0,
  currentPage = 0,
  nextPage,
  handleCurrentPage
}: TodoListType) => {
  const [searchParams] = useSearchParams();
  const { refetch } = useTodosQuery();
  const { filter, search } = Object.fromEntries([...searchParams]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [idx, setIdx] = useState<number>();

  useEffect(() => {
    if (currentPage === 1) {
      return;
    }
    setVisibleTodos((prev) => [...prev, ...todos]);
  }, [todos]);

  useEffect(() => {
    if (handleCurrentPage) {
      handleCurrentPage();
    }
    refetch();

    setVisibleTodos(todos);
  }, [filter, search]);

  useEffect(() => {
    if (idx === (totalTodos / pageTotal - 1) * currentPage) {
      if (nextPage) {
        nextPage();
      }
    }
  }, [idx]);

  return visibleTodos.length <= 0 ? (
    <Error title="Nothing to show" />
  ) : (
    <>
      <Styled.StyledSwiper
        pagination={{
          dynamicBullets: true,
          el: '.swiper-pagination',
          clickable: true
        }}
        modules={[Pagination]}
        onSwiper={(swiper: SwiperClass) => {
          swiper.allowSlidePrev = true;
          swiper.on('slideChange', () => {
            setIdx(swiper.realIndex);
          });
        }}
      >
        {visibleTodos.map(({ description, id, isCompleted, title, personal }) => (
          <SwiperSlide key={id}>
            <TabletTodoListItem
              key={id}
              description={description}
              id={id}
              isCompleted={isCompleted}
              title={title}
              personal={personal}
            />
          </SwiperSlide>
        ))}
      </Styled.StyledSwiper>
      <div className="swiper-pagination" />
    </>
  );
};

export default TabletTodoList;
