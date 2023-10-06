import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: ${(props) => props.theme.SPACES.m};
  margin-bottom: ${(props) => props.theme.SPACES.xxl};
  padding: ${(props) => props.theme.SPACES.m};
  border: 1px solid ${(props) => props.theme.COLORS.black};
  border-radius: ${(props) => props.theme.RADIUS.l};
`;
