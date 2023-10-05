import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import * as Styled from './tabletTodoList.styled';

import 'swiper/css';
import 'swiper/css/pagination';
import { TodoListType } from '../../../types/student.types';
import TabletTodoListItem from '../../todoListsItems/tabletTodoListItem/tabletTodoListItem.component';
import Error from '../../error/error.component';

const TabletTodoList = ({ todos }: TodoListType) =>
  todos.length <= 0 ? (
    <Error title="Add TODO!" />
  ) : (
    <>
      <Styled.StyledSwiper
        pagination={{
          dynamicBullets: true,
          el: '.swiper-pagination',
          clickable: true
        }}
        modules={[Pagination]}
      >
        {todos.map(({ description, id, isCompleted, title, personal }) => (
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

export default TabletTodoList;
