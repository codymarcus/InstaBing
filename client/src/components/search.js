import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

import ImageCardList from './image_card_list';

class Search extends Component {
  constructor() {
    super();
    this.searchImagesDebounced = _.debounce(value => this.props.searchImages(value), 500);
  }

  searchImages(event) {
    this.searchImagesDebounced(event.target.value);
  }

  render() {
    return (
      <div className="search">
        <h2>Add Images To Your Profile</h2>
        <input className="form-control"
             placeholder="Search for images..."
             onChange={this.searchImages.bind(this)} />
           <ImageCardList addable={true} />
      </div>
    );
  }
}

Search.propTypes = {
  searchImages: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { images: state.images };
}

export default connect(mapStateToProps, actions)(Search);
