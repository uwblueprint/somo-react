import React, { PureComponent } from 'react';
import Radium from 'radium';

import { HEADER_HEIGHT } from 'constants';

@Radium
export default class Header extends PureComponent {
  render() {
    return (
      <div style={styles.header}>
        SOMO SURVEYS
      </div>
    );
  }
}

const styles = {
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.05)',
    fontFamily: 'Helvetica',
    fontSize: '16px',
    color: 'rgba(0,0,0,0.87)',
    margin: '0px',
    padding: '0 5%',
    lineHeight: '56px',
    ':hover': {
      fontSize: '17px',
    },
  },
};
