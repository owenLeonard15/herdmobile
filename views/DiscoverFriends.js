import React from 'react';
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler';

import { useState, useEffect, useReducer } from 'react';

// Amplify imports
import {API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
// This is the general AWS javascript SDK, needed to interact directly with the Cognito
// user pool so that a list of all users can be retrieved
const AWS = require('aws-sdk/dist/aws-sdk-react-native');




const DiscoverFriends = ({navigation}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [userPoolId, setUserPoolId] = useState(null);

    useEffect(() => {
        const init = async() => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setCurrentUser(currentUser);
            setUserPoolId(currentUser.pool.userPoolId);
        }
        init()
    }, []);

    useEffect(() => {
        setAllUsers(listAllUsers(""));
    }, [userPoolId]);

    async function getIsFollowing(followeeId){
        const res = await API.graphql(graphqlOperation(getFollowRelationship,{
          followeeId: followeeId,
          followerId: currentUser["username"],
        }));
        console.log(res)
        return res.data.getFollowRelationship !== null
        console.log("follower: ", followerId);
        console.log("followee: ", followeeId);
        return false;
    }

    const listAllUsers = async(searchBy) => {
        const currentCreds = await Auth.currentUserCredentials();

        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
            apiVersion: '2016-04-18', 
            region: "us-east-1",
            credentials: currentCreds
        });
        // only make the call if userPoolId has been initialized
        if(!userPoolId){
            return;
        }
        var params = {
            UserPoolId: userPoolId, /* required */
            AttributesToGet: [
              'email'
              /* more items */
            ],
            Limit: '20',
            Filter: `username^=\"${searchBy}\"`
          };
    
          cognitoidentityserviceprovider.listUsers(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{                     // successful response
                setAllUsers(data.Users);

                // Need to set follow relationships here
            }
          });
    }

    const Item = ({ title, following }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          { following ?
            (
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: 'white'}}>Unfollow</Text>
                </TouchableOpacity>
            ) :
            (
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: 'white'}}>Follow</Text>
                </TouchableOpacity>
            )
          }
          
        </View>
      );

    const renderUserList = ({ item }) => (
        <Item title={item["Username"]} following={false} />
    );
    

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={styles.container}>
                <View style={styles.topLeft}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} >
                            <MaterialIcons name="menu" size={40} color="#F07167" />
                    </TouchableOpacity>
                </View>            
                <View style={styles.topCenter}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Discover Friends</Text>
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.searchBarRow}>
                        <Text style={{fontWeight: 'bold'}}>Search: </Text>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Find a friend by username"
                            onChangeText={text => listAllUsers(text)}
                        />
                    </View>
                    <SafeAreaView style={styles.listContent}>
                        <FlatList
                            data={allUsers}
                            renderItem={renderUserList}
                            keyExtractor={item => item["Username"]}
                        />
                    </SafeAreaView> 
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
        height: 40,
        width: '40%',
        borderRadius: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#FED9B7',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    item: {
        backgroundColor: '#FDFCDC',
        padding: 20,
        marginVertical: 1,
        marginHorizontal: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
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
        height: '88%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
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

export default DiscoverFriends;
