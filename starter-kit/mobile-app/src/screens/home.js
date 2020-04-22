import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 36,
    color: '#00004d',
    paddingBottom: 20,
    paddingTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
    paddingHorizontal: 0,
    marginHorizontal: 0
  },
  subtitle: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 26,
    color: '#ffffff',
    textDecorationLine: 'underline',
    paddingBottom: 15,
    paddingTop: 10,
    paddingLeft: 140,
    textAlign: 'right',
    paddingRight: 10,
    fontWeight: 'bold',
  },
  content: {
    fontFamily: 'IBMPlexSans-Light',
    color: '#cc3300',
    marginTop: 20,
    marginBottom: 35,
    fontSize: 18,
    marginLeft: 140,
    textAlign: 'right',
    paddingRight: 10,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    resizeMode: "center",
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

const Home = () => (
  <ImageBackground source={require('../images/playhome-1.jpg')} imageStyle={{ opacity: 0.5 }} style={styles.image}>
    <ScrollView style={styles.outerView}>
      <View style={styles.center}>
        <Text style={styles.title}>Team Knockout</Text>
        <Text style={styles.subtitle}>
          Welcome to Community Play Home Service.
      </Text>
        <Text style={styles.content}>
          Let's make the life of working professionals working from home a little easier by engaging their kids.
      </Text>
      </View>
    </ScrollView>
  </ImageBackground>
);

export default Home;
