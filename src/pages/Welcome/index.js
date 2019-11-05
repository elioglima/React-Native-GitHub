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
    errLogin: false,
    loading: false,
  };

  checkUserExists = async username => {
    const user = await api.get(`/users/${username}`);
    return user;
  };

  saveUser = async username => {
    await AsyncStorage.setItem('@GitHuber:username', username);
  };

  signIn = async () => {
    const { username } = this.state;
    this.setState({ loading: true });

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);
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
          Para continuar é preciso que voçê informe o seu usuário no GitHub.
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuátio"
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
