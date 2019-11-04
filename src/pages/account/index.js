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

const logado = () => {
  AsyncStorage.clear();
  return (
    <View>
      <Text>logado</Text>
    </View>
  );
};
export default logado;
