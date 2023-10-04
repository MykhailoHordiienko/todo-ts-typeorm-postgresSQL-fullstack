import styled from 'styled-components';

export const Button = styled.button`
  width: fit-content;
  white-space: nowrap;
  min-width: auto;
  background-color: ${(props) => props.theme.COLORS.primary};
  transition-property: background-color, box-shadow, color;
  transition-duration: ${(props) => props.theme.ANIMATIONS.DELAY.button};
  transition-timing-function: ${(props) => props.theme.ANIMATIONS.CUBIC.button};
  border: none;
  border-radius: ${(props) => props.theme.RADIUS.s};
  padding: ${(props) => props.theme.SPACES.s} ${(props) => props.theme.SPACES.s};

  cursor: pointer;
  &:hover:not([disabled]),
  &:focus:not([disabled]) {
    background-color: ${(props) => props.theme.COLORS.accent};
    color: ${(props) => props.theme.COLORS.white};
    box-shadow: ${(props) => props.theme.SHADOW.button};
  }
`;
