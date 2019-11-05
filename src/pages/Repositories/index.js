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
      refreshing: false,
    }
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="folder-o" size={20} color={tintColor} />
  }

  loadRepositories = async () => {
    this.setState({ loadRepository: true })
    const username = await AsyncStorage.getItem('@GitHuber:username')
    const repositoryStringify = await AsyncStorage.getItem(`@GitHuber${username}:repos`);
    let repositories = JSON.parse(repositoryStringify)
    if (!repositories) repositories = []

    if (repositories.length == 0) {
      const { data } = await api.get(`/users/${username}/repos`)
      await AsyncStorage.setItem(`@GitHuber${username}:repos`, JSON.stringify(data));
      if (data)
        repositories = data
    }

    this.setState({ data: repositories, loading: false, loadRepository: false })
  }

  loadRefreshData = async () => {
    this.setState({ loadRepository: true })
    const username = await AsyncStorage.getItem('@GitHuber:username')
    const { data } = await api.get(`/users/${username}/repos`)
    let repositories = []
    if (data) repositories = data
    await AsyncStorage.setItem(`@GitHuber${username}:repos`, JSON.stringify(repositories));
    this.setState({ data: repositories, loading: false, loadRepository: false })
  }


  componentDidMount() {
    this.loadRepositories()
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />

  renderList = () => {
    const { data } = this.state
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRefreshData}
        refreshing={this.state.refreshing}
      />
    )
  }

  render() {
    return (
      <View style={styles.baseContainer}>
        <Header title={'Repositórios'} />
        {this.state.loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
};


export default Repositories;
