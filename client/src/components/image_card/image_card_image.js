import React, { PropTypes } from 'react';

function ImageCardImage(props) {
  return (
    <div className="image-wrapper">
      <img className="card-img-top" src={props.url} />
    </div>
  );
}

ImageCardImage.propTypes = {
  url: PropTypes.string.isRequired
};

export default ImageCardImage;
