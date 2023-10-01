import React from 'react';
import * as Styled from './container.styled';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Styled.Section>
    <Styled.Container>{children}</Styled.Container>
  </Styled.Section>
);

export default Container;
