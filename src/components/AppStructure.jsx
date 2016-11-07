import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default class AppStructure extends PureComponent {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    return (
      <div>
        <Header />
        <div style={styles.app}>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  app: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    fontFamily: 'Helvetica',
    padding: '16px',
    margin: '8px 0',
  },
};
