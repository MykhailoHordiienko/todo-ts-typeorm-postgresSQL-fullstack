import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const DomLink = styled(NavLink)`
  width: fit-content;
  white-space: nowrap;
  text-decoration: none;
  color: ${(props) => props.theme.COLORS.black};
  min-width: auto;
  background-color: ${(props) => props.theme.COLORS.primary};
  transition-property: background-color, box-shadow, color;
  transition-duration: ${(props) => props.theme.ANIMATIONS.DELAY.button};
  transition-timing-function: ${(props) => props.theme.ANIMATIONS.CUBIC.button};
  border: none;
  border-radius: ${(props) => props.theme.RADIUS.s};
  padding: ${(props) => props.theme.SPACES.s} ${(props) => props.theme.SPACES.s};

  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.COLORS.accent};
    color: ${(props) => props.theme.COLORS.white};
    box-shadow: ${(props) => props.theme.SHADOW.button};
  }

  &.active {
    background-color: ${(props) => props.theme.COLORS.accent};
    color: ${(props) => props.theme.COLORS.white};
    box-shadow: ${(props) => props.theme.SHADOW.button};
  }
`;
