import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

export default class SelectedSurveyPage extends PureComponent {
  static propTypes = {
    id: PropTypes.number,
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        This is the SelectedSurveyPage with id { id }.
      </div>
    );
  }
}
