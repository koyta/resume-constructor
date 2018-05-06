import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import RootStore from './stores/rootStore';
import Wrapper from './Wrapper';


const rootStore = new RootStore();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, rootStore.routing);

render(
  <Provider {...rootStore}>
    <Router history={history}>
      <Wrapper />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
