import React from 'react';
import PureComponent from 'react-pure-render/component';

import { FOOTER_HEIGHT } from 'constants';

export default class Footer extends PureComponent {
  render() {
    return (
      <div style={styles.footer}>
        <p style={styles.footerText}>Copyright &copy; 2016 UW Blueprint</p>
      </div>
    );
  }
}

const styles = {
  footer: {
    height: FOOTER_HEIGHT,
    position: 'absolute',
    bottom: '0',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    fontFamily: 'Helvetica',
    fontSize: '14px',
    color: 'rgba(0,0,0,0.87)',
    margin: '0px',
  },
  footerText: {
    marginLeft: '16px',
  },
};
