import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default function(ComposedComponent) {
  function Addable (props) {
    return (
      <ComposedComponent onClick={() => this.saveImage(props.url)}
                         addable
                         {...this.props} />
    );
  }

  Addable.propTypes = {
    saveImage: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
  };

  return connect(null, actions)(Addable);
}
