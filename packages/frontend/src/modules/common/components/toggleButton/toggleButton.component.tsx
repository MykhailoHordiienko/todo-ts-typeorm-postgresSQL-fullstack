import React, { useEffect, useState } from 'react';
import * as Styled from './toggleButton.styled';

type ToggleButtonType = {
  status: boolean;
  action: () => void;
  disabled?: boolean;
};

const ToggleButton = ({ status, action, disabled = false }: ToggleButtonType) => {
  const [checked, setChecked] = useState(status);

  useEffect(() => {
    setChecked(status);
  }, [status]);

  return (
    <Styled.Label>
      <Styled.Input checked={checked} type="checkbox" disabled={disabled} onChange={action} />
      <Styled.Switch />
    </Styled.Label>
  );
};

export default ToggleButton;
