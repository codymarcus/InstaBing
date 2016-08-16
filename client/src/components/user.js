import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ImageCardList from './image_card_list';

class User extends Component {
  componentWillMount() {
    this.props.selectUser(this.props.params.id);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.selectUser(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  render() {
    return (
      <div className="user">
        <h2>{this.props.user ? this.props.user.username : ''}</h2>
        <ImageCardList userId={parseInt(this.props.params.id)} />
      </div>
    );
  }
}

User.propTypes = {
  selectUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.users.selected
  };
}

export default connect(mapStateToProps, actions)(User);
