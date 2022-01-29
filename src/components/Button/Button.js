import PropTypes from 'prop-types';
import StyledButton from './StyledButton';

export default function Button({ onLoadMore }) {
  return (
    <StyledButton type="button" onClick={onLoadMore}>
      Load more
    </StyledButton>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
