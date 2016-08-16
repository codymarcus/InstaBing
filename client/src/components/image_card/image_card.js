import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ImageCardComment from './image_card_comment';
import ImageCardImage from './image_card_image';

class ImageCard extends Component {
  renderUserLink() {
    // If the image is owned by another user, show a link to that user's profile
    if (this.props.user) {
      return (
        <Link to={`/users/${this.props.user.id}`}>
          {this.props.user.username}
        </Link>
      );
    }
  }

  renderCard() {
    return (
      <div className="card">
        <ImageCardImage url={this.props.url} />
        <div className="card-block">
          <ImageCardComment imageId={this.props.id}
                            comment={this.props.comment}
                            isAuthOwner={this.props.userId === this.props.authId} />
          {this.renderUserLink()}
        </div>
      </div>
    );
  }

  render() {
    const isAuthOwner = this.props.userId === this.props.authId;

    return (
      <div className="image-card col-xs-12 col-sm-6 col-md-4">
        <div className="card">
          <ImageCardImage url={this.props.url} />
          <div className="card-block">
            <ImageCardComment imageId={this.props.id}
                              comment={this.props.comment}
                              isAuthOwner={isAuthOwner} />
            {this.renderUserLink()}
          </div>
        </div>
      </div>
    );
  }
}

ImageCard.propTypes = {
  saveImage: PropTypes.func.isRequired,
  user: PropTypes.object,
  addable: PropTypes.bool,
  url: PropTypes.string.isRequired,
  id: PropTypes.number,
  comment: PropTypes.string,
  userId: PropTypes.number,
  authId: PropTypes.number
};

function mapStateToProps(state) {
  return { authId: state.auth.id };
}

export default connect(mapStateToProps, actions)(ImageCard);
