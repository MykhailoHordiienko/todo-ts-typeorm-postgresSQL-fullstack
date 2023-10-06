import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../button/button.component';
import * as Styled from './filter.styled';
import Search from '../search/search.component';
import { useDebounce } from '../../hooks/useDebounce';

type FilterType = {
  isSuccess: boolean;
};

const Filter = ({ isSuccess }: FilterType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter: filterUrl, search: searchUrl } = Object.fromEntries([...searchParams]);

  const [filter, setFilter] = useState(() => filterUrl ?? 'all');
  const [search, setSearch] = useState(() => searchUrl ?? '');

  const debouncedValue = useDebounce<string>(search, 500);

  useEffect(() => {
    if (!debouncedValue) {
      setSearchParams({ filter });
    } else {
      setSearchParams({ filter, search: debouncedValue });
    }
  }, [debouncedValue, filter]);

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFilter(e.currentTarget.innerText.toLowerCase());
  };

  const handleSerch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <Styled.ButtonsContainer>
      <Button
        disabled={!isSuccess}
        isActive={filter === 'all'}
        type="button"
        title="All"
        callBack={handleFilter}
      />
      <Button
        disabled={!isSuccess}
        isActive={filter === 'private'}
        type="button"
        title="Private"
        callBack={handleFilter}
      />
      <Button
        disabled={!isSuccess}
        isActive={filter === 'public'}
        type="button"
        title="Public"
        callBack={handleFilter}
      />
      <Button
        disabled={!isSuccess}
        isActive={filter === 'completed'}
        type="button"
        title="Completed"
        callBack={handleFilter}
      />
      <Search value={search} callBack={handleSerch} />
    </Styled.ButtonsContainer>
  );
};

export default Filter;
