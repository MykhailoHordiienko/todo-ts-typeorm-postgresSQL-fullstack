import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.COLORS.bgModal};
  z-index: 1200;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACES.m};
  padding: ${(props) => props.theme.SPACES.m};
  min-width: 80%;
  max-height: 100vh;

  background: ${(props) => props.theme.COLORS.bgMain};
  border-radius: ${(props) => props.theme.RADIUS.m};
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
