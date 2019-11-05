import React from 'react';
import styles from './styles';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../../styles';
import api from '../../services/api';

export default class Welcome extends React.Component {
  state = {
    username: '',
    userData: {},
    errLogin: false,
    loading: false,
  };

  checkUserExists = async username => {
    const user = await api.get(`/users/${username}`);
    return user;
  };

  signIn = async () => {
    const { username } = this.state;
    this.setState({ loading: true });

    try {
      const response = await api.get(`/users/${username}`);
      await AsyncStorage.setItem('@GitHuber:status', String('Online'));
      await AsyncStorage.setItem('@GitHuber:username', String(response.data.login));
      await AsyncStorage.setItem('@GitHuber:userData', JSON.stringify(response.data));
      const { navigation } = this.props;
      navigation.navigate('User');

    } catch (error) {
      this.setState({ loading: false });
      this.setState({ errLogin: true });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.secundary}
        />
        <Text style={styles.title}>Bem Vindo</Text>
        <Text style={styles.text}>
          Para continuar é preciso que você informe o seu usuário no GitHub.
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
            value={this.state.username}
            onChangeText={text => this.setState({ username: text })}
          />
          {this.state.errLogin && (
            <Text style={{ color: colors.danger }}>Usuário inválido</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.buttonText}>Prosseguir</Text>
              )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
