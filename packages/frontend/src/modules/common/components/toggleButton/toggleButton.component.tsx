import React from 'react';
import * as Styled from './toggleButton.styled';

type ToggleButtonType = {
  status: boolean;
  action: () => void;
  disabled?: boolean;
};

const ToggleButton = ({ status, action, disabled = false }: ToggleButtonType) => (
  <Styled.Label>
    <Styled.Input checked={status} type="checkbox" disabled={disabled} onChange={action} />
    <Styled.Switch />
  </Styled.Label>
);

export default ToggleButton;
