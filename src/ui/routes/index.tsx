import * as React from 'react';
import { Router, Switch, Route } from 'react-router';
import PresenceRoute from './presence';
import LoginRoute from './login';
import Dashboard from 'ui/components/dashboard';
import UserRoute from './user';
import UserRoleRoute from './user-role';
import history from 'utils/history';
import { Provider } from 'react-redux';
import { store } from 'store'

const Routes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/' component={PresenceRoute} exact />
          <Route path='/login' component={LoginRoute} exact />
          {/* <Dashboard path='/admin/user' component={UserRoute} exact /> */}
          {/* <Dashboard path='/admin/user-role' component={UserRoleRoute} exact /> */}
        </Switch>
      </Router>
    </Provider>
  )
}

export default Routes;