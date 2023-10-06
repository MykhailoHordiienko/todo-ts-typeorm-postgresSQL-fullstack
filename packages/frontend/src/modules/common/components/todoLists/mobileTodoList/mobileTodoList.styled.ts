import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.SPACES.m};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: ${(props) => props.theme.SPACES.m};
  margin-bottom: ${(props) => props.theme.SPACES.xxl};
  padding: ${(props) => props.theme.SPACES.m};
`;
