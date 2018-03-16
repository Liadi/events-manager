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
      users: [],
      accountUser: accountUser,
      userToken: userToken,
      passwordConfirmed: true,
      fetching: false,
      fetched: false,
      error: {
        fieldError: {},
        serverError: null,
      },
      page: 1,
      limit: 10,
      totalElement: 0,
      sort: {
        item: 'createdAt',
        order: 'INC',
      },
    }
  });
})

ReactDOM.render((
  <Provider store={store}>
      <App/>
  </Provider>
), document.getElementById('app'));
