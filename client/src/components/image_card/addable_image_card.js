import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ImageCardImage from './image_card_image';

function AddableImageCard(props) {
  return (
    <div className="image-card col-xs-12 col-sm-6 col-md-4">
      <div className="card addable" onClick={() => props.saveImage(props.url)}>
        <ImageCardImage url={props.url} />
      </div>
    </div>
  );
}

AddableImageCard.propTypes = {
  saveImage: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export default connect(null, actions)(AddableImageCard);
