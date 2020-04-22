import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import { search } from '../lib/utils';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%'
  },
  inputsView: {
    backgroundColor: '#e6f2ff',
    padding: 16,
    width: '100%',
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
    color: '#5c5cd6'
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
    color: '#5c5cd6'
  },
  button: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15
  },
  searchResultText: {
    fontFamily: 'IBMPlexSans-Bold',
    padding: 10,
    color: '#1062fe',
    fontSize: 20,
    width: '100%',
    textShadowColor: 'rgba(255, 100, 50, 1)',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 20
  },
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
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  image: {
    flex: 1,
    resizeMode: "center",
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SearchResources = function ({ route, navigation }) {
  const [query, setQuery] = React.useState({ type: 'Playhome', name: '' });
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');

  const Item = (props) => {
    return (
      <TouchableOpacity style={styles.itemTouchable}
        onPress={() => { navigation.navigate('Map', { item: props }); }}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text>
        </View>
        <Text style={styles.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );
  };

  const searchItem = () => {
    const payload = {
      ...query
    };

    search(payload)
      .then((results) => {
        setInfo(`${results.length} Result(s)`)
        setItems(results);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{ text: 'OK' }]);
      });
  };

  return (
    <View style={styles.outerView}>
      <ImageBackground source={require('../images/playhome-4.jpg')} imageStyle={{ opacity: .5 }} style={styles.image}>
        <View style={styles.inputsView}>
          <Text style={styles.label}>Type</Text>
          <PickerSelect
            style={{ inputIOS: styles.selector }}
            value={query.type}
            onValueChange={(t) => setQuery({ ...query, type: t })}
            items={[
              { label: 'Playhome', value: 'Food' },
              { label: 'Tuition', value: 'Help' },
              { label: 'Other', value: 'Other' }
            ]}
          />
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={query.name}
            onChangeText={(t) => setQuery({ ...query, name: t })}
            onSubmitEditing={searchItem}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder=''
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={searchItem}>
            <Text style={styles.button}>Search</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.searchResultText}>{info}</Text>

        <FlatList style={styles.flatListView}
          data={items}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={item => item.id || item['_id']}
        />
      </ImageBackground>
    </View>
  );
};

export default SearchResources;
