import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableNativeFeedback } from 'react-native'
import CacheImage from '../../../components/cacheImage'
import styles from './styles'


const Objeto = ({ dados }) => {

  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
        <CacheImage style={styles.foto} uri={dados.avatar_url} />
        <Text style={styles.login}>{dados.login}</Text>
      </View>
    </TouchableNativeFeedback >
  )
}

export default Objeto