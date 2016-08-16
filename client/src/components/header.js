import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // Show a link to sign out
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to={`/users/${this.props.authUserId}`}>
            {this.props.authUsername}
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/search">
            Add Pics
          </Link>
        </li>,
        <li className="nav-item sign-out" key={0}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ];
    } else {
      // Show a link to sign in or sign up
      return [
        <li className="nav-item" key={0}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }

  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">InstaBing - Everyone's Feed</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool,
  authUserId: PropTypes.number,
  authUsername: PropTypes.string
};

function mapStateToProps({ auth }) {
  return {
    authUserId: auth.id,
    authUsername: auth.username,
    authenticated: auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
