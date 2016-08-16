import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ImageCardComment extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, commentValue: '' };
  }

  editComment() {
    if (this.props.isAuthOwner) {
      this.setState({ isEditing: true });
    }
  }

  saveComment() {
    this.setState({ isEditing: false });
    this.props.saveComment(this.props.imageId, this.state.commentValue);
  }

  changeComment(event) {
    this.setState({ commentValue: event.target.value });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="input-group">
          <input className="form-control comment-field"
                 placeholder="Enter a comment"
                 onChange={this.changeComment.bind(this)} />
          <span className="input-group-btn">
            <button className="btn btn-primary"
                    onClick={this.saveComment.bind(this)}>
              Save
            </button>
          </span>
        </div>
      );
    }

    const comment = this.props.comment ? this.props.comment : 'No caption';

    const commentClasses = `card-text ${this.props.isAuthOwner ? 'editable' : ''}`;

    return (
      <p className={commentClasses} onClick={this.editComment.bind(this)}>
        {comment}
      </p>
    );
  }
}

ImageCardComment.propTypes = {
  isAuthOwner: PropTypes.bool.isRequired,
  saveComment: PropTypes.func.isRequired,
  imageId: PropTypes.number.isRequired,
  comment: PropTypes.string
};

export default connect(null, actions)(ImageCardComment);
