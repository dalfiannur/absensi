import { RouteProps, Route } from 'react-router';
import history from '../history';

interface Props extends RouteProps {
  authenticated: boolean | null
}

export class PrivateRoute extends Route<Props> {
  componentDidMount() {
    if (!this.props.authenticated) {
      history.push('/login')
    }
  }
}