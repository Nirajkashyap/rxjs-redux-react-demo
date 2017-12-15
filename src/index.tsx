import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { configureStore } from './store';
import { App } from './containers/App';

import { AsyncComponent } from './AsyncComponent';
import { module } from './module';


const store = configureStore();
const history = createBrowserHistory();

const register = module(store);
const projects = () => register('projects', import(/* webpackChunkName: "projects" */ './modules/projects/index'));


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
        <Route path={`projects`} exact={true} component={() => <AsyncComponent moduleProvider={projects} />} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
