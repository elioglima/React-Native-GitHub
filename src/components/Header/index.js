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
class Header extends React.Component {
  //   static prototype = {
  //     title: PropTypes.string.isRequired,
  //   };
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.secundary} />
        <View style={styles.left} />
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity onPress={this.signOut}>
          <Icon name="exchange" size={16} sytle={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Header);
