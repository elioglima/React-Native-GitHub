import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    height: 30 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding * 1.5,
    marginBottom: 10,
  },
  perfil: {
    flexDirection: 'row',
  },

  foto: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 8,
  },

  descritivos: {
    flexDirection: 'column',
  },

  descritivosLinha: {
    flexDirection: 'row',
  },

  descritivosLinhaLogin: {
    fontSize: 9,
    color: colors.dark,
    marginRight: 5,
  },

  descritivosLinhaCompany: {
    fontSize: 9,
    color: colors.dark,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darker,
  },
  icon: {
    color: colors.darker,
  },
});

export default styles;
