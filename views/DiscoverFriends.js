import React from 'react';
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler';

import { useState, useEffect, useReducer } from 'react';

// Amplify imports
import {API, graphqlOperation } from 'aws-amplify';
import {getFollowRelationship } from '../src/graphql/queries';
import{ createFollowRelationship, deleteFollowRelationship} from '../src/graphql/mutations'
import Auth from '@aws-amplify/auth';
// This is the general AWS javascript SDK, needed to interact directly with the Cognito
// user pool so that a list of all users can be retrieved
const AWS = require('aws-sdk/dist/aws-sdk-react-native');


const DiscoverFriends = ({navigation}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [userPoolId, setUserPoolId] = useState(null);

    // initialize the state variables
    useEffect(() => {
        const init = async() => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setCurrentUser(currentUser);
            setUserPoolId(currentUser.pool.userPoolId);
        }
        init()
    }, []);

    // Retrieve and set the list of all users
    // Every time userPoolId changes, retrieve the list again
    useEffect(() => {
        setAllUsers(listAllUsers(""));
    }, [userPoolId]);

    // retrieve a boolean followRelationship between followee and current user
    async function getIsFollowing(followeeId){
        const res = await API.graphql(graphqlOperation(getFollowRelationship,{
          followeeId: followeeId,
          followerId: currentUser["username"],
        }));
        console.log("getIsFollowing: ", res)
        return true;
        return res.data.getFollowRelationship !== null
        
    }

    // current user follows user with username userId
    const follow = async (userId) => {
        console.log('follow')
        const input = {
            followeeId: userId,
            followerId: currentUser.username,
            timestamp: Date.now(),
        }
        const res = await API.graphql(graphqlOperation(createFollowRelationship, {input: input}));
        if(!res.data.createFollowRelationship.erros) setIsFollowing(true);
        console.log("Follow: ", res);
        return res !== null
    }
    
    // current user unfollows user with username userId
    const unfollow = async(userId) => {
        console.log('unfollow');
        const input = {
            followeeId: userId,
            followerId: currentUser.username,
        }
        const res = await API.graphql(graphqlOperation(deleteFollowRelationship,{input: input}));

        if(!res.data.deleteFollowRelationship.erros) setIsFollowing(false);
        console.log("Unfollow: ", res)
        return res !== null
    }

    // list all users
    // filter by String by starts with "searchBy"
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
          
          // interact directly with AWS cognito user pool to list all users in the pool
          cognitoidentityserviceprovider.listUsers(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{                     // successful response
                // Retrieve and set follow relationships for all users
                let userData = data.Users;
                userData.forEach(user => {
                    getIsFollowing(user["username"])
                    .then(resp => {
                        user["followRelationship"] = resp;
                    });
                });
                setAllUsers(data.Users);
            }
          });
    }

    // render a single user row with username and follow/unfollow button
    const Item = ({ userId, following }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{userId}</Text>
          { following ?
            (
                <TouchableOpacity style={styles.button} onPress={() => unfollow(userId)}>
                    <Text style={{color: 'white'}}>Unfollow</Text>
                </TouchableOpacity>
            ) :
            (
                <TouchableOpacity style={styles.button} onPress={() => follow(userId)}>
                    <Text style={{color: 'white'}}>Follow</Text>
                </TouchableOpacity>
            )
          }
          
        </View>
      );

    const renderUserList = ({ item }) => (
        <Item userId={item["Username"]} following={false} />
        // <Item userId={item["Username"]} following={getIsFollowing(item["Username"])} />

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
