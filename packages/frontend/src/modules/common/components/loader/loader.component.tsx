import React from 'react';
import * as Styled from './loader.styled';
import { COLORS } from '../../../theme';

const Loader = () => (
  <Styled.Loader
    viewBox="0 0 400 160"
    height={160}
    width={400}
    backgroundColor="transparent"
    foregroundColor={COLORS.accent}
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </Styled.Loader>
);

export default Loader;
