import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  infoBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  highlightText: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'right',
    paddingVertical: 2,
  },
});
