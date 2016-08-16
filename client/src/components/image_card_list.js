import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ImageCard from './image_card/image_card';
import AddableImageCard from './image_card/addable_image_card';

class ImageCardList extends Component {
  componentWillMount() {
    this.props.clearImages();
    if (!this.props.addable) {
      // Fetch images from user if userId is supplied, otherwise fetch all images
      this.props.fetchImages(this.props.userId || null);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.props.fetchImages(nextProps.userId || null);
    }
  }

  renderImageCards() {
    if (this.props.addable) {
      return this.props.images.map(image => (
        <AddableImageCard key={image.url} {...image} />
      ));
    }

    return this.props.images.map(image => (
      <ImageCard key={image.id || image.url} {...image} />
    ));
  }

  render() {
    return (
      <div className="image-card-list">
        {this.renderImageCards()}
      </div>
    );
  }
}

ImageCardList.propTypes = {
  clearImages: PropTypes.func.isRequired,
  addable: PropTypes.bool,
  fetchImages: PropTypes.func.isRequired,
  userId: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return { images: state.images };
}

export default connect(mapStateToProps, actions)(ImageCardList);
