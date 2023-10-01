import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorTitle = styled.h1`
  margin-top: ${(props) => props.theme.SPACES.xl};
  font-weight: ${(props) => props.theme.FONTS.WEIGHTS.bold};
`;

export const ErrorImg = styled.img`
  width: 50%;
  margin-top: ${(props) => props.theme.SPACES.xl};
  border-radius: ${(props) => props.theme.RADIUS.l};
`;
