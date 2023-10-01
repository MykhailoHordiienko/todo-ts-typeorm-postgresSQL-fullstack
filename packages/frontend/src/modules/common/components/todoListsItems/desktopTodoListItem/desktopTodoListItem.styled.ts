import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.SPACES.m};
`;

export const Td = styled.td`
  padding: ${(props) => props.theme.SPACES.m};
  overflow-wrap: anywhere;
`;
