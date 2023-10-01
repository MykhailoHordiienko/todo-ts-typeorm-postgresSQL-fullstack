import styled from 'styled-components';

export const Section = styled.section`
  max-width: 100%;
`;

export const Container = styled.div`
  @media screen and (max-width: ${(props) => props.theme.BREAKPOINTS.s}) {
    & {
      max-width: ${(props) => props.theme.BREAKPOINTS.s};
      margin: 0 auto;
      padding-left: ${(props) => props.theme.SPACES.m};
      padding-right: ${(props) => props.theme.SPACES.m};
    }
  }

  @media screen and (min-width: ${(props) => props.theme.BREAKPOINTS.s}) {
    & {
      max-width: ${(props) => props.theme.BREAKPOINTS.m};
      margin: 0 auto;
      padding-left: ${(props) => props.theme.SPACES.m};
      padding-right: ${(props) => props.theme.SPACES.m};
    }
  }

  @media screen and (min-width: ${(props) => props.theme.BREAKPOINTS.m}) {
    & {
      max-width: ${(props) => props.theme.BREAKPOINTS.l};
      margin: 0 auto;
      padding-left: ${(props) => props.theme.SPACES.m};
      padding-right: ${(props) => props.theme.SPACES.m};
    }
  }
`;
