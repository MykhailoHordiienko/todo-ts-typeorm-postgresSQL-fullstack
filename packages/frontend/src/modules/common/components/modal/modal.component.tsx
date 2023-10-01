import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './modal.styled';
import Button from '../button/button.component';
import { ModalType } from '../../types/student.types';

const Modal = ({ isActive, toggleModal, children, closeButton }: ModalType) => {
  if (!isActive) {
    return null;
  }

  const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const closeModalEsc = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModalEsc);

    return () => {
      window.removeEventListener('keydown', closeModalEsc);
    };
  });
  return createPortal(
    <Styled.Backdrop onClick={handleClickBackdrop}>
      <Styled.Modal>
        {closeButton && (
          <Styled.CloseButtonContainer>
            <Button disabled={false} type="button" title="Close" action={toggleModal} />
          </Styled.CloseButtonContainer>
        )}
        {children}
      </Styled.Modal>
    </Styled.Backdrop>,
    document.body
  );
};

export default Modal;
