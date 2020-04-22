import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';

import { search, userID } from '../lib/utils'

const styles = StyleSheet.create({
  flatListView: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    width: '100%'
  },
  itemTouchable: {
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25,
    backgroundColor: '#e6f2ff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    margin: 5,
    marginBottom: 0,
    borderRadius: 15
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  /* emptyListView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, */
  emptyListText: {
    fontFamily: 'IBMPlexSans-Bold',
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5
  },
  image: {
    flex: 1,
    resizeMode: "center",
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MyResources = function ({ navigation }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      search({ userID: userID() })
        .then(setItems)
        .catch(err => {
          console.log(err);
          Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{ text: 'OK' }]);
        });
    })
  }, []);

  const Item = (props) => {
    return (
      <TouchableOpacity style={styles.itemTouchable}
        onPress={() => { navigation.navigate('Edit Playhome', { item: props }); }}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text>
        </View>
        <Text style={styles.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );
  };

  if (items.length > 0) {
    return (
      <ImageBackground source={require('../images/playhome-2.jpg')} imageStyle={{ opacity: 0.75 }} style={styles.image}>
        <FlatList style={styles.flatListView}
          data={items}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={item => item.id || item['_id']}
        />
      </ImageBackground>
    )
  } else {
    return (
      <ImageBackground source={require('../images/playhome-2.jpg')} imageStyle={{ opacity: 0.75 }} style={styles.image}>
        <View style={styles.emptyListView}>
          <Text style={styles.emptyListText}>You currently have no Playhomes listed</Text>
        </View>
      </ImageBackground>
    )
  }
};

export default MyResources;
