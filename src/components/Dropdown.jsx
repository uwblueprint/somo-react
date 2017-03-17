import React, { PureComponent, PropTypes } from 'react';
import Radium from 'radium';

const DROPDOWN_KEY = 'DROPDOWN_KEY';

@Radium
export default class Dropdown extends PureComponent {
  static propTypes = {
    selectedValue: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,  // Must have a parameter that is the new value selected.
    width: PropTypes.number,
  };

  static defaultProps = {
    width: -1,
  };

  render() {
    const { selectedValue, options, onChange, width } = this.props;
    return (
      <div
        key={DROPDOWN_KEY}
        style={{
          ...styles.container,
          ...(!Radium.getState(this.state, DROPDOWN_KEY, ':hover') ? {
            borderBottomLeftRadius: dropdownBorderRadius,
            borderBottomRightRadius: dropdownBorderRadius,
          } : {}),
          width: width > -1 ? `${width}px` : 'initial',
        }}
      >
        <div style={styles.selectedItem}>
          {options[selectedValue]}
        </div>
        { Radium.getState(this.state, DROPDOWN_KEY, ':hover') && (
          <div
            onClick={e => onChange(e.target.getAttribute('value'))}
            style={{
              ...styles.content,
              width: width > -1 ? `${width}px` : 'initial',
            }}
          >
            { Object.keys(options).map(value => value !== selectedValue && (
              <div
                key={value}
                value={value}
                style={styles.item}
              >
                { options[value] }
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const dropdownBorder = '1px solid lightgrey';
const dropdownPadding = '8px 40px';
const dropdownBackground = 'white';
const dropdownBorderRadius = '4px';
const styles = {
  container: {
    ':hover': {},
    position: 'relative',
    display: 'inline-block',
    background: dropdownBackground,
    fontSize: '14px',
    border: dropdownBorder,
    borderTopLeftRadius: dropdownBorderRadius,
    borderTopRightRadius: dropdownBorderRadius,
    cursor: 'pointer',
  },
  content: {
    position: 'absolute',
    left: '-1px',
    background: dropdownBackground,
    zIndex: 1,
    borderLeft: dropdownBorder,
    borderRight: dropdownBorder,
    borderBottom: dropdownBorder,
    borderBottomLeftRadius: dropdownBorderRadius,
    borderBottomRightRadius: dropdownBorderRadius,
    cursor: 'pointer',
  },
  selectedItem: {
    padding: dropdownPadding,
  },
  item: {
    padding: dropdownPadding,
    borderTop: dropdownBorder,
    ':hover': {
      background: 'lightgrey',
    },
  },
};
