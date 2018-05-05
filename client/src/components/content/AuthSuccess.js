import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class AuthSuccess extends Component {

  componentDidMount() {
    const url = '/test';
    window.opener.open(url, '_self');
    window.opener.focus();
    window.close();
  }

  render() {
    return (
      <div>
        AUTH SUCCESS!
      </div>
    );
  }

}
