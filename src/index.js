import React from 'react';
import createNavigator from './routes';
import {AsyncStorage} from 'react-native';

export default class App extends React.Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GitHuber:username');
    this.setState({userChecked: true, userLogged: !!username});
  }

  render() {
    !this.state.userChecked && null;
    const Routes = createNavigator(this.state.userLogged);
    return <Routes />;
  }
}
