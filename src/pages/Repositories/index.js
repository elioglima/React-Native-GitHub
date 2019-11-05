import React from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  SafeAreaView,
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  Text
} from 'react-native';

import Header from '../../components/Header';
import api from '../../services/api'
import RepositoryItem from './RepositoryItem'

class Repositories extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
    }
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GitHuber:username')
    const { data } = await api.get(`/users/${username}/repos`)
    this.setState({ data, loading: false })
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />

  renderList = () => {
    const { data } = this.state
    console.log('renderList')
    return (
      <SafeAreaView >
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderListItem}
        />
      </SafeAreaView>
    )
  }

  render() {
    return (
      <SafeAreaView>
        <Header title={'Repositórios'} />
        <View style={styles.container}>
          {this.state.loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
        </View>

      </SafeAreaView>
    );
  }
};


export default Repositories;
