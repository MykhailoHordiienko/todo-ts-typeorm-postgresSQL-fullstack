import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import * as Styled from './tabletTodoList.styled';

import 'swiper/css';
import 'swiper/css/pagination';
import { TodoListType } from '../../../types/student.types';
import TabletTodoListItem from '../../todoListsItems/tabletTodoListItem/tabletTodoListItem.component';

const TabletTodoList = ({ todos }: TodoListType) => (
  <>
    <Styled.StyledSwiper
      pagination={{
        dynamicBullets: true,
        el: '.swiper-pagination',
        clickable: true
      }}
      modules={[Pagination]}
    >
      {todos.map(({ description, id, isCompleted, title }) => (
        <SwiperSlide key={id}>
          <TabletTodoListItem
            key={id}
            description={description}
            id={id}
            isCompleted={isCompleted}
            title={title}
          />
        </SwiperSlide>
      ))}
    </Styled.StyledSwiper>
    <div className="swiper-pagination" />
  </>
);

export default TabletTodoList;
