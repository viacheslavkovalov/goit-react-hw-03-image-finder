import PropTypes from 'prop-types';
import errorImage from './errorImage.jpg';
import { Div, P } from './ErrorDispaly.styled';

export default function ErrorDisplay({ texterror }) {
  return (
    <Div role="error">
      <P text={texterror}>{texterror}</P>
      <img src={errorImage} width="500" alt="error" />
    </Div>
  );
}
ErrorDisplay.propTypes = {
  texterror: PropTypes.string.isRequired,
};
