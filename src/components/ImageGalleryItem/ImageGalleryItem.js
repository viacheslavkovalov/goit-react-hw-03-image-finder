import PropTypes from 'prop-types';
import { StyledImageGalleryItem, StyledImage } from './StyledImageGalleryItem';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) {
  return (
    <StyledImageGalleryItem>
      <StyledImage
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={onOpenModal}
      />
    </StyledImageGalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
  onOpenModal: PropTypes.func.isRequired,
};
