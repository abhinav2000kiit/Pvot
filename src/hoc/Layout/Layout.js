import React, { Component } from 'react';
import Auxx from '../Auxx/Auxx';
import './Layout.scss';

class Layout extends Component {
  render() {
    return <Auxx>{this.props.children}</Auxx>;
  }
}

export default Layout;
