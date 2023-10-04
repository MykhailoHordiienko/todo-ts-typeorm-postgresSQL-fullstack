import styled from 'styled-components';

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.SPACES.m};
  cursor: pointer;
`;

export const Switch = styled.div`
  position: relative;
  width: ${(props) => props.theme.WIDTH.xl};
  height: ${(props) => props.theme.HEIGHT.l};
  background: ${(props) => props.theme.COLORS.bgToggleButton};
  border-radius: ${(props) => props.theme.RADIUS.l};
  padding: ${(props) => props.theme.SPACES.xs};
  transition: ${(props) => props.theme.ANIMATIONS.DELAY.button} all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: ${(props) => props.theme.WIDTH.l};
    height: ${(props) => props.theme.HEIGHT.l};
    border-radius: ${(props) => props.theme.RADIUS.l};
    top: 50%;
    left: 4px;
    background: ${(props) => props.theme.COLORS.white};
    transform: translate(0, -50%);
  }
`;

export const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:disabled + ${Switch}:before {
    background: ${(props) => props.theme.COLORS.error};
  }

  &:disabled + ${Switch} {
    cursor: not-allowed;
  }

  &:checked + ${Switch} {
    background: ${(props) => props.theme.COLORS.success};

    &:before {
      transform: translate(32px, -50%);
    }
  }
`;
