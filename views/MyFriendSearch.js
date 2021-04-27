import React from 'react';
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler';

// Amplify imports
import { useState, useEffect, useReducer } from 'react';
import {API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';

import { getFollowRelationship, listFollowRelationships }  from '../graphql/queries'
import { createFollowRelationship, deleteFollowRelationship } from '../graphql/mutations';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.posts;
    case ADDITIONAL_QUERY:
      return [...state, ...action.posts]
    case SUBSCRIPTION:
      return [action.post, ...state]
    default:
      return state;
  }
};

const MyFriendSearch = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const [followerView, setFollowerView] = useState(true);
    
    const getIsFollowing = async ({followerId, followeeId}) => {
        const res = await API.graphql(graphqlOperation(getFollowRelationship,{
          followeeId: followeeId,
          followerId: followerId,
        }));
        console.log(res)
        return res.data.getFollowRelationship !== null
      }

    const listFollowers = async ({followeeId}) => {
        console.log("list followers \n")
        const res = await API.graphql(graphqlOperation(listFollowRelationships, {
            followeeId: followeeId
        }));

        console.log("FOLLOWERS: ", res.data.listFollowRelationships.items)
        setFollowers(res.data.listFollowRelationships.items)
        return res.data.listFollowRelationships.items
    }

    const listFollowing = async ({followerId}) => {
        console.log("list following \n")
        const res = await API.graphql(graphqlOperation(listFollowRelationships, {
            followeeId: followerId
        }));
        console.log("FOLLOWING", res.data.listFollowRelationships.items)
        return res.data.listFollowRelationships.items
    }

    const follow = async (userId) => {
        console.log('follow')
        const input = {
            followeeId: userId,
            followerId: currentUser.username,
            timestamp: String(Date.now()),
        }
        const res = await API.graphql(graphqlOperation(createFollowRelationship, {input: input}));
        console.log(res);
    }
    
    const unfollow = async(userId) => {
        console.log('unfollow');
        const input = {
            followeeId: userId,
            followerId: currentUser.username,
        }
        const res = await API.graphql(graphqlOperation(deleteFollowRelationship,{input: input}));
        console.log(res)
    }

    useEffect(() => {
        const init = async() => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setCurrentUser(currentUser);

            //setIsFollowing(await getIsFollowing({followeeId: userId, followerId: currentUser.username}));
            
            setFollowers(await listFollowers({followeeId: currentUser.username}));
            setFollowing(await listFollowing({followerId: currentUser.username}));
        }
        init()

    }, []);
    
    // render a single user row with username and follow/unfollow button
    const Item = ({ userId }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{userId}</Text>
          {/* { userId !== currentUser["Username"] && followerView ?
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
           */}
        </View>
      );

    const renderUserList = ({ item }) => (
        <Item userId={item.followeeId} />
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
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>My Friends</Text>
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.searchBarRow}>
                        <Text style={{fontWeight: 'bold'}}>Search: </Text>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="find a friend"
                            title={"hello"}
                        />
                    </View>
                    { followerView ? (
                    <View style={styles.selectorRow}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', height: 35, backgroundColor: '#00AFB9'}} onPress={() => setFollowerView(true)}>
                            <Text style={{ color: 'white'}}>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', height: 35, backgroundColor: 'white'}} onPress={() => setFollowerView(false)}>
                            <Text style={{ color: 'black'}}>Following</Text>
                        </TouchableOpacity>
                    </View>) 
                    : (<View style={styles.selectorRow}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', height: 35, backgroundColor: 'white'}} onPress={() => setFollowerView(true)}>
                            <Text style={{ color: 'black'}}>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', height: 35, backgroundColor: '#00AFB9'}} onPress={() => setFollowerView(false)}>
                            <Text style={{ color: 'white'}}>Following</Text>
                        </TouchableOpacity>
                    </View>) 
                    }
                    <SafeAreaView style={styles.listContent}>
                    {
                        (followers !== null || following !== null) ?
                            followerView ? (
                                <FlatList
                                    data={followers}
                                    renderItem={renderUserList}
                                    keyExtractor={item => item["timestamp"]}
                                />
                            )
                            : (
                                <FlatList
                                    data={following}
                                    renderItem={renderUserList}
                                    keyExtractor={item => item["timestamp"]}
                                />
                            )  
                        : <Text>Loading...</Text>
                    }
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
            marginTop: 0,
            height: '100%',
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
        selectorRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 20
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
})

export default MyFriendSearch;
