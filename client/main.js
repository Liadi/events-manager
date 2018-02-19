import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import store from './store';
import { saveState } from './localStorage';

store.subscribe(() => {
  const {accountUser, userToken} = store.getState().user;
  saveState({
    user: {
      user: {},
      logs: [],
      accountUser,
      userToken,
      passwordConfirmed: true,
      fetching: false,
      fetched: false,
      error: {
        fieldError: {},
        serverError: null,
      },
    }
  });
})

ReactDOM.render((
  <Provider store={store}>
      <App/>
  </Provider>
), document.getElementById('app'));
