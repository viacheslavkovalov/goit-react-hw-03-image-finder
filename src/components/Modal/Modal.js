import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { StyledOverlay, StyledModal } from './StyledModal';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  handleBackDrop = event => {
    if (event.currentTarget === event.target) {
      this.props.onToggleModal();
    }
  };

  render() {
    return createPortal(
      <StyledOverlay onClick={this.handleBackDrop}>
        <StyledModal>
          <img src={this.props.largeImageURL} alt="largeImage" />
        </StyledModal>
      </StyledOverlay>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};
