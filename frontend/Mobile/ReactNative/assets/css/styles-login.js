import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  // card: {
  //   minWidth: '90%',
  // },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },

  cardContainer: {
    position: 'absolute',
    borderRadius: 20,
    right: 0,
    left: 0,
    bottom: 25,
    maxWidth: '100%',
  },
  // cardWrapper: {
  //   bottom: 0,
  // },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  link: {
    color: 'blue',
  },
  text1: {
    color: 'blue',
    marginTop: -20,
    marginBottom: 25,
  },
  text2: {
    marginTop: 10,
  },
  view: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export {styles};
