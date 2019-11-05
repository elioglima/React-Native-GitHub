import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import Header from '../../components/Header';

class Organizations extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Header title={'Organização'} />
      </SafeAreaView>
    );
  }
};

Organizations.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />
}

export default Organizations;