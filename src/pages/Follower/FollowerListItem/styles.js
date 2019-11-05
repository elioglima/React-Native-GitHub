import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: 10,
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: 5,
    flexDirection: 'row',
    paddingLeft: 12,
    alignItems: 'center',

  },
  foto: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 7,
  },
  login: {
    fontSize: 16,
    fontWeight: 'bold',

  },
});

export default styles;
