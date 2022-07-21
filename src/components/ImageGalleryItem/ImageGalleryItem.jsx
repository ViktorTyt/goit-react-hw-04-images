import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, src, alt, openModal }) => {
  const { ImageGalleryItem, ImageGalleryItemImage } = css;

  return (
    <li className={ImageGalleryItem} id={id} onClick={() => openModal(id)}>
      <img src={src} alt={alt} className={ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
