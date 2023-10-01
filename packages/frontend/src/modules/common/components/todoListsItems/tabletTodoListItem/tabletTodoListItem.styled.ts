import styled from 'styled-components';

export const Item = styled.li`
  padding: ${(props) => props.theme.SPACES.m};
  border: 1px solid ${(props) => props.theme.COLORS.black};
  border-radius: ${(props) => props.theme.RADIUS.m};
  overflow-wrap: anywhere;
`;

export const Title = styled.h3`
  margin-bottom: ${(props) => props.theme.SPACES.m};
  text-align: center;
  color: ${(props) => props.theme.COLORS.black};
  font-weight: ${(props) => props.theme.FONTS.WEIGHTS.bold};
  font-size: ${(props) => props.theme.FONTS.SIZES.m};
  line-height: ${(props) => props.theme.FONTS.LINEHEIGHT.m};
  letter-spacing: ${(props) => props.theme.FONTS.LETERSPACING.s};
  text-transform: uppercase;
`;
export const Description = styled.p`
  margin-bottom: ${(props) => props.theme.SPACES.m};
  color: ${(props) => props.theme.COLORS.primary};
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActionContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.SPACES.m};
`;

export const ToggleContainer = styled.div`
  margin-left: auto;
`;
