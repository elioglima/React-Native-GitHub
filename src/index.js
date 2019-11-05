import React from 'react';
import createNavigator from './routes';
import { AsyncStorage } from 'react-native';

export default class App extends React.Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const onLine = await AsyncStorage.getItem('@GitHuber:status');
    this.setState({ userChecked: true, userLogged: (onLine == 'OnLine') });
  }

  render() {
    !this.state.userChecked && null;
    const Routes = createNavigator(this.state.userLogged);
    return <Routes />;
  }
}
