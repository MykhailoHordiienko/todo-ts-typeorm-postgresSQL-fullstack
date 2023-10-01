import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border: 1px solid ${(props) => props.theme.COLORS.black};
  border-radius: ${(props) => props.theme.RADIUS.s};
`;

export const Thead = styled.thead`
  background-color: ${(props) => props.theme.COLORS.accent};
`;

export const Tbody = styled.tbody`
  tr:nth-child(even) {
    background-color: ${(props) => props.theme.COLORS.bgTable};
  }
`;
