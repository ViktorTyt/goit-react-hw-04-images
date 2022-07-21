import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { Overlay, Modal } = css;
    const { largeImage, largeImageAlt } = this.props;

    return (
      <div className={Overlay} onClick={this.handleBackDrop}>
        <div className={Modal}>
          <img src={largeImage} alt={largeImageAlt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  largeImageAlt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
