import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewUsers } from '../services/socket';

// essa prop navigation, vem de forma automatica para todas as paginas da aplicação, pois vem da routes.js
function Main({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      // const { granted} = await requestPermissionsAsync();
      const { granted } = await Location.requestPermissionsAsync();
      // granted significa se deu permissão ou não

      if (granted) {
        const { coords } = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          // calculos navais para obter o zoom dentro do mapa.
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    };

    loadInitialPosition();

  }, []);

  // useEffect: Dispara uma função toda vez que uma variavel muda de valor.
  useEffect(() => {
    subscribeToNewUsers(user => setUsers([...users, user]));
  }, [users])

  function setupWebsocket() {

    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      // passions,
    );

    // subscribeToNewUsers();
  };

  async function loadUsers() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
      }
    });
    // console.log(response.data.users)
    setUsers(response.data.users);
    setupWebsocket();

  };

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  };

  if (!currentRegion) {
    return null;
  };

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {users.map(user => (
          <Marker
            key={user._id}
            coordinate={{
              longitude: user.location.coordinates[0],
              latitude: user.location.coordinates[1],
            }}
          >
            <Image
              style={styles.avatar}
              source={{ uri: user.avatar_url }}
            />

            {/* O que vai aparecer abaixo da imagem, tipo o popup do MapBox */}
            {/* onPress é parecido com o onClick */}
            <Callout onPress={() => {
              // passo o nome da tela(component) que eu quero enviar o usuario. Passo parametros(informações) para a outra tela.
              navigation.navigate('Profile', { github_username: user.github_username });
            }}>
              <View style={styles.callout}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userBio}>{user.bio}</Text>
                {/* <Text style={styles.userPassions}>{user.passions.join(', ')}</Text> */}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        {/* <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuários por paixões..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        /> */}

        <TouchableOpacity onPress={loadUsers} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },

  callout: {
    width: 260,
  },

  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  userBio: {
    color: '#777',
    marginTop: 5,
  },

  userPassions: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    // IOS sombra
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    }, //IOS />

    // ANDROID sombra
    elevation: 4 //ANDROID />

  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: 'teal',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 15,
    left: 135
  }

})

export default Main;