import styled from 'styled-components';
import { ErrorMessage } from 'formik';

export const TextArea = styled.textarea`
  width: 100%;
  height: ${(props) => props.theme.HEIGHT.xxxl};
  resize: none;
  padding: ${(props) => props.theme.SPACES.s};
  border-radius: ${(props) => props.theme.RADIUS.s};
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: ${(props) => props.theme.COLORS.error};
`;
