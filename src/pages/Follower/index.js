import React from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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
import FollowerListItem from './FollowerListItem'

class Follower extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      FollowersData: [],
      FollowingData: [],
      loading: true,
      refreshing: false,
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="account-switch" size={20} color={tintColor} />
  }

  loadFollowers = async () => {
    this.setState({ loadRepository: true })
    const username = await AsyncStorage.getItem('@GitHuber:username')
    const repositoryStringify = await AsyncStorage.getItem(`@GitHuber${username}:followers`);
    let repositories = JSON.parse(repositoryStringify)
    if (!repositories) repositories = []

    if (repositories.length == 0) {
      const { data } = await api.get(`/users/${username}/followers`)
      await AsyncStorage.setItem(`@GitHuber${username}:followers`, JSON.stringify(data));
      if (data)
        repositories = data
    }

    this.setState({ FollowersData: repositories, loading: false, loadRepository: false })
  }

  loadFollowing = async () => {
    this.setState({ loadRepository: true })
    const username = await AsyncStorage.getItem('@GitHuber:username')
    const repositoryStringify = await AsyncStorage.getItem(`@GitHuber${username}:following`);
    let repositories = JSON.parse(repositoryStringify)
    if (!repositories) repositories = []

    if (repositories.length == 0) {
      const { data } = await api.get(`/users/${username}/following`)
      await AsyncStorage.setItem(`@GitHuber${username}:following`, JSON.stringify(data));
      if (data)
        repositories = data
    }

    this.setState({ FollowingData: repositories, loading: false, loadRepository: false })
  }


  loadRefreshFollowers = async () => {
    this.setState({ loadRepository: true })
    const username = await AsyncStorage.getItem('@GitHuber:username')
    const { data } = await api.get(`/users/${username}/followers`)
    let repositories = []
    if (data) repositories = data
    await AsyncStorage.setItem(`@GitHuber${username}:followers`, JSON.stringify(repositories));
    this.setState({ FollowersData: repositories, loading: false, loadRepository: false })
  }

  loadRefreshFollowing = async () => {
    const username = await AsyncStorage.getItem('@GitHuber:username')
    const { data } = await api.get(`/users/${username}/following`)
    let repositories = []
    if (data) repositories = data
    await AsyncStorage.setItem(`@GitHuber${username}:following`, JSON.stringify(repositories));
    this.setState({ FollowingData: repositories, loading: false, loadRepository: false })
  }
  
  renderListItem = ({ item }) => <FollowerListItem dados={item} />  

  loadRefreshAll = () => {
    this.loadRefreshFollowers()
    this.loadRefreshFollowing()
  }

  loadAllData = () => {
    this.loadFollowers()
    this.loadFollowing()
  }

  renderList = () => {
    const { FollowingData, FollowersData } = this.state
    let data = FollowersData

    if (!data) data = []

    if (FollowingData && FollowingData.length > 0) {
      let DadosFiltrados = FollowingData.filter(r1 => !(data.filter(r2 => r2.login == r1.login).length > 0))
      if (DadosFiltrados.length > 0)
        data = data.concat(DadosFiltrados)
    }
    
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRefreshAll}
        refreshing={this.state.refreshing}
      />
    )
  }

  componentDidMount() {
    this.loadAllData()
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


export default Follower;
