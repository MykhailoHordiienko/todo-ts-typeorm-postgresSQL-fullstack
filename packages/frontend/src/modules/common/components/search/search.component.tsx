import React from 'react';
import * as Styled from './search.styled';
import { SearchType } from '../../types/student.types';

const Search = ({ callBack, value }: SearchType) => (
  <Styled.Input type="text" placeholder="Search here" onChange={callBack} value={value} />
);
export default Search;
