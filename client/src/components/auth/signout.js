import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>See you next time!</div>;
  }
}

Signout.propTypes = {
  signoutUser: PropTypes.func.isRequired
};

export default connect(null, actions)(Signout);
