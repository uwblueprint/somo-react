import React from 'react';
import ReactDOM from 'react-dom';
import PureComponent from 'react-pure-render/component';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import PageNotFound from './components/PageNotFound.jsx';
import AllSurveysContainer from './containers/AllSurveysContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import SelectedSurveyContainer from './containers/SelectedSurveyContainer.jsx';

class App extends PureComponent {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRoute component={LoginContainer} />
          <Route path="surveys">
            <IndexRoute component={AllSurveysContainer} />
            <Route path=":id" component={SelectedSurveyContainer} />
          </Route>
          <Route path="*" component={PageNotFound} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
