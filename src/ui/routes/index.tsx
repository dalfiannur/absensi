import * as React from 'react';
import { Router, Switch, Route } from 'react-router';
import PresenceRoute from './presence';
import Dashboard from 'ui/components/dashboard';
import history from 'utils/history';
import { Provider } from 'react-redux';
import { store } from 'store'
import DashboardRoute from './_admin/dashboard';
import UserRoute from './_admin/user';
import UserRoleRoute from './_admin/user-role';
import PresenceTypeRoute from './_admin/presence-type';
import DepartementRoute from './_admin/departement'
import LoginRoute from './login';


const Routes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/' component={PresenceRoute} exact />
          <Route path='/login' component={LoginRoute} exact />
          <Dashboard path='/admin' component={DashboardRoute} exact />
          <Dashboard path='/admin/user' component={UserRoute} exact />
          <Dashboard path='/admin/user-role' component={UserRoleRoute} exact />
          <Dashboard path='/admin/presence-type' component={PresenceTypeRoute} exact />
          <Dashboard path='/admin/departement' component={DepartementRoute} exact />
        </Switch>
      </Router>
    </Provider>
  )
}

export default Routes;