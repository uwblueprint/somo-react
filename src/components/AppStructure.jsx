import React, { PureComponent, PropTypes } from 'react';

import Footer from 'components/Footer';
import Header from 'components/Header';
import { HEADER_HEIGHT, FOOTER_HEIGHT } from 'constants';

export default class AppStructure extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
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
    height: `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT})`,
  },
};
