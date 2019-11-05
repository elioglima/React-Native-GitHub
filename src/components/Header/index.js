import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import styles from './styles';
import PropTypes from 'prop-types';
import { colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import CacheImage from '../cacheImage';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      full_name: '',
    }
  }

  async componentDidMount() {
    const userDataStringify = await AsyncStorage.getItem('@GitHuber:userData');
    const userData = JSON.parse(userDataStringify)
    this.setState({
      url: userData.avatar_url,
      full_name: userData.name,
      login: userData.login,
      company: userData.company
    })
  }

  signOut = async () => {
    await AsyncStorage.setItem('@GitHuber:status', String('OffLine'));
    // await AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.secundary} />
        <View style={styles.perfil} >
          {this.state.url && <CacheImage style={styles.foto} uri={this.state.url} />}
          <View style={styles.descritivos} >
            <Text style={styles.full_name}>{this.state.full_name}</Text>
            <View style={styles.descritivosLinha} >
              <Text style={styles.descritivosLinhaLogin}>{this.state.login}</Text>
              <Text style={styles.descritivosLinhaCompany}>{this.state.company}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={this.signOut}>
          <Icon name="power-off" size={16} sytle={styles.icon} />
        </TouchableOpacity>

      </View>
    );
  }
}

export default withNavigation(Header);
