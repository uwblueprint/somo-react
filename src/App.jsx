import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppStructure from 'components/AppStructure';
import PageNotFound from 'components/PageNotFound';
import AllSurveysContainer from 'containers/AllSurveysContainer';
import LoginContainer from 'containers/LoginContainer';
import SelectedSurveyContainer from 'containers/SelectedSurveyContainer';
import { ALL_SURVEYS_PAGE } from 'constants';
import { store } from 'store';

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={AppStructure}>
            <IndexRoute component={LoginContainer} />
            <Route path={ALL_SURVEYS_PAGE}>
              <IndexRoute component={AllSurveysContainer} />
              <Route path=":id" component={SelectedSurveyContainer} />
            </Route>
            <Route path="*" component={PageNotFound} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
