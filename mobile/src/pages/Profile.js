import React from 'react';
// import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';


function Profile({ navigation }) {
    //navigation.getParam('') ->parecido com o $_GET[] e $_POST[] do PHP
    const githubUsername = navigation.getParam('github_username');

    return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />
    // <View><Text>olá {githubUsername}</Text></View> 
}

export default Profile;