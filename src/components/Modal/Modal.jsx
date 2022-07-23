import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ largeImage, largeImageAlt, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const { Overlay, Modal } = css;

  return (
    <div className={Overlay} onClick={handleBackDrop}>
      <div className={Modal}>
        <img src={largeImage} alt={largeImageAlt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  largeImageAlt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
