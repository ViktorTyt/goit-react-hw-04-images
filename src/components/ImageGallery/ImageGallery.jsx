import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components';

export const ImageGallery = ({ imageList, openModal }) => {
  const { ImageGallery } = css;

  return (
    <ul className={ImageGallery}>
      {imageList &&
        imageList.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            src={webformatURL}
            alt={tags}
            openModal={openModal}
          />
        ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
