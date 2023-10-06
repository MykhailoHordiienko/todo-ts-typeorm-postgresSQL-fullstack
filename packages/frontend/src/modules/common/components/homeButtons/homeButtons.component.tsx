import React from 'react';
import * as Styled from './homeButtons.styled';
import Button from '../button/button.component';

type HomeButtonsProps = {
  isSuccess: boolean;
  toggleModal: () => void;
  logOut: () => void;
  toggleProfile: () => void;
};

const HomeButtons = ({ isSuccess, toggleModal, logOut, toggleProfile }: HomeButtonsProps) => (
  <Styled.ButtonsContainer>
    <Button disabled={!isSuccess} type="button" title="Add Todo" action={toggleModal} />
    <Button disabled={!isSuccess} type="button" title="Profile" action={toggleProfile} />
    <Button disabled={!isSuccess} type="button" title="Log-Out" action={() => logOut()} />
  </Styled.ButtonsContainer>
);

export default HomeButtons;
