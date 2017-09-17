/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './modules/App/App';
import Login from './modules/Login/Login.js';

// Routes
import Main from './modules/MainContainer/MainContainer';
import Surveys from './modules/Surveys/Surveys';
import ChatBot from './modules/ChatBot/ChatBot';

// require.ensure polyfill for node
// if (typeof require.ensure !== 'function') {
//   require.ensure = function requireModule(deps, callback) {
//     callback(require);
//   };
// }

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
// if (process.env.NODE_ENV !== 'production') {
//   // Require async routes only in development for react-hot-reloader to work.
//   require('./modules/Post/pages/PostListPage/PostListPage');
//   require('./modules/Post/pages/PostDetailPage/PostDetailPage');
// }

export const redirect = (route) => {
  browserHistory.push(route);
};

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <Route component={Main}>
      <IndexRoute component={Login} />
      <Route path="/surveys" component={Surveys} />
      <Route path="/chatbot" component={ChatBot} />
    </Route>
  </Route>

);
