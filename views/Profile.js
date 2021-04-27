import React from 'react';
import { FlatList, Image, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler';

import { useState, useEffect, useReducer } from 'react';

// Amplify imports
import {API, graphqlOperation } from 'aws-amplify';
import {getFollowRelationship } from '../graphql/queries';
import{ createFollowRelationship, deleteFollowRelationship} from '../graphql/mutations'
import Auth from '@aws-amplify/auth';
// This is the general AWS javascript SDK, needed to interact directly with the Cognito
// user pool so that a list of all users can be retrieved

const AWS = require('aws-sdk/dist/aws-sdk-react-native');

const Profile = ({navigation}) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const init = async() => {
            const currentUser = await Auth.currentAuthenticatedUser();
            console.log(currentUser)
            setCurrentUser(currentUser);
        };

        init();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={styles.container}>
                <View style={styles.topLeft}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} >
                            <MaterialIcons name="menu" size={40} color="#F07167" />
                    </TouchableOpacity>
                </View>            
                <View style={styles.topCenter}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Profile</Text>
                </View>
                <View style={styles.mainContent}>
                    <View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../assets/profile.png')} style={{width: 200, height: 200}}/>
                        {currentUser ? <Text style={{backgroundColor: 'white', fontSize: 60, textAlign: 'center', marginTop: 20, width: '100%'}}>{currentUser["username"]}</Text> : null }
                    </View>
                    <TouchableOpacity style={styles.button} >
                        <Text style={{color: 'white', fontSize: 30}} onPress={() => Auth.signOut()}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}



const styles = StyleSheet.create({
button: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00AFB9',
    height: 80,
    width: '60%',
    borderRadius: 5
},
container: {
    flex: 1,
    backgroundColor: '#FED9B7',
    alignItems: 'center',
    justifyContent: 'flex-end'
},

listContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 15
},
mainContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
},
searchBar: {
    backgroundColor: 'white',
    height: 40,
    marginLeft: 12,
    borderWidth: 0,
    width: 200, 
    padding: 5,
    color: 'black',
    borderRadius: 5
},
searchBarRow: {
    width: '100%',  
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
},
title: {
    fontSize: 32,
},
topCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '6%'
},
topLeft: {
    position: 'absolute',
    top: '5%',
    left: '5%'
},
});


export default Profile;