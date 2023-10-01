import styled from 'styled-components';
import { ErrorMessage } from 'formik';

export const Input = styled.input`
  padding: ${(props) => props.theme.SPACES.s};
  width: 100%;
  height: ${(props) => props.theme.HEIGHT.xl};
  border-radius: ${(props) => props.theme.RADIUS.s};
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: ${(props) => props.theme.COLORS.error};
`;
