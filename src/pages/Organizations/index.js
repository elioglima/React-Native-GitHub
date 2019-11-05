import React from 'react';

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

const Organizations = () => {
  return (
    <SafeAreaView>
      <Header title={'Repositórios'} />
    </SafeAreaView>
  );
};
export default Organizations;
