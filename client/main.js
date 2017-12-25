import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <Landing />
  </BrowserRouter>
), document.getElementById('app'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
