import React from 'react';
import { useState, useEffect } from 'react';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Auth from '@aws-amplify/auth';
const AWS = require('aws-sdk/dist/aws-sdk-react-native');

const ResRecommendations = ({navigation}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [restaurantList, setRestaurantList] = useState([]);
    const [allUsers, setAllUsers] = useState(null);
    const [userPoolId, setUserPoolId] = useState(null);

    // Get the current user.
    useEffect(() => {
        const init = async() => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setCurrentUser(currentUser);
            setUserPoolId(currentUser.pool.userPoolId);
        };

        init();
    }, []);

    useEffect(() => {
            setAllUsers(listAllUsers(""));
    }, [userPoolId]);

    // Get the recommended restaurants for the current user.
    useEffect(() => {
        const getRecommendations = async() => {
            // Get the recommended restaurants for the current user.

            // Problem:
            // Here is a hard-coded list I made to test if getting
            // a list of favorite restaurants of multiple users is
            // working fine. It turns out it is, but since I don't
            // have access to listing all users of my user pool,
            // this list needs to be replaced by the true user list
            // to actually work, and "test[i]"s in the code should
            // all be replaced by the username of the current user
            // whose favorite restaurants we are fetching.
            var test = ["xingbei"];

            let resArray = [];

            for (var i = 0; i < test.length; i++){
                if (test[i] != currentUser.username){
                    const resList = await getFavsOfCurrentUser(test[i]);

                    // Here we extract and store only the data that we want to keep from the list of complete objects
                    for (var j = 0; j < resList.length; j++){
                        resArray.push({
                            name: resList[j].resName,
                            icon: resList[j].resImageUrl,
                            types: resList[j].resCategories,
                            vicinity: resList[j].resAddress,
                            username: test[i]
                        });
                    }
               }
            }

            setRestaurantList(resArray);
        };

        if (currentUser !== null) {
            getRecommendations();
        }

    }, [currentUser, restaurantList]);

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
              /* more items */            ],
            Limit: '20',
            Filter: `username^=\"${searchBy}\"`
          };

          // interact directly with AWS cognito user pool to list all users in the pool
          cognitoidentityserviceprovider.listUsers(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                setAllUsers(data.Users);
            }
          });
    }

    // Fetch favorite restaurants of the current user.
    const getFavsOfCurrentUser = async(username) => {
      const url = 'https://i7vva9aayi.execute-api.us-east-2.amazonaws.com/dev/getfavres/' + username;
      const res = await fetch(url);
      const resJson = await res.json();
      return resJson.items;
    }

    // Write a favorite item to FavRestaurantTable.
    const writeFavRestaurant = (item) => {
    console.log(item);
        // Get categories.
        const categories = item.item.types;

        fetch('https://i7vva9aayi.execute-api.us-east-2.amazonaws.com/dev/writefav', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            resName: item.item.name,
            userId: currentUser.username,
            resCategories: categories,
            resImageUrl: item.item.icon,
            resAddress: item.item.vicinity
          })
        }).then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
            })
          .catch((error) => {
              console.error(error);
           });
    }

    // Render a restaurant item.
    const renderItem = (item) => {
        // Get image url.
        const imageUrl = item.icon;
        const pic = {
            uri: imageUrl
        };

        // Get restaurant name.
        const restaurantName = item.name;

        // Get categories.
        const categories = item.types.split(", ");
        const categoriesStr = categories[0] + ", " + categories[1];

        // Get address lines.
        const addressRaw = item.vicinity;
        const addressRawList = addressRaw.split(", ");
        const addressRow1 = addressRawList[0];
        const addressRow2 = addressRawList[1];

        const recommender = item.username;

        return (

            (currentUser !== null && restaurantList != null) ?
            <View style={{height: 150, width: '100%', alignItems: 'center', flex: 1, flexDirection: 'row', margin: 10, padding: 15, borderBottomColor: 'white', borderBottomWidth: 1}}>
                <Image source={pic} style={{width: 80, height: 80}}/>
                <View style={styles.textContainer}>
                    <Text style={{color: '#624630', fontWeight: 'bold'}}>{restaurantName}</Text>
                    <Text style={styles.textFont}>{categoriesStr}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textFont}>{addressRow1}</Text>
                    <Text style={styles.textFont}>{addressRow2}</Text>
                </View>
                <View style={styles.textContainer}>
                     <Text style={styles.textFont}>Liked by:</Text>
                     <Text style={styles.textFont}>{recommender}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={(e) => handleHeartPress(e, {item})}>
                        <AntDesign name="heart" size={16} color="#FFC0CB" />
                    </TouchableOpacity>
                </View>
            </View>
            :  <View style={{height: 150, width: '100%', alignItems: 'center', flex: 1, flexDirection: 'row', margin: 10, padding: 15, borderBottomColor: 'white', borderBottomWidth: 1}}>

        </View>
        );
    }

    // Write the item to FavRestaurantTable when user likes an item.
    const handleHeartPress = (event, item) => {
        writeFavRestaurant(item);
    }

    return (
        restaurantList.length == 0 ?
        (<View style={styles.container}>
            <View style={styles.topLeft}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} >
                                <MaterialIcons name="menu" size={40} color="#F07167" />
                </TouchableOpacity>
            </View>
            <View style={styles.topCenter}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Recommendations</Text>
            </View>
            <View style={styles.mainContent}>
                <Text>Loading Recommendations ...</Text>
            </View>
        </View>)
        :
        (<View style={styles.container}>
            <View style={styles.topLeft}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} >
                                <MaterialIcons name="menu" size={40} color="#F07167" />
                </TouchableOpacity>
            </View>
            <View style={styles.topCenter}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Recommendations</Text>
            </View>
            <SafeAreaView style={styles.mainContent}>
                <FlatList
                    style={{width: '100%'}}
                    data={restaurantList}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={item => item.name}
                />
            </SafeAreaView>
        </View>)
    )
}

 {/* Styling the restaurant list container and restaurant items */}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FED9B7',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%'
    },
    mainContent: {
        width: '100%',
        height: '88%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#FED9B7'
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
    item: {
        backgroundColor: '#FDFCDC',
        padding: 20,
        marginVertical: 1,
        marginHorizontal: 0,
        width: "100%"
      },
    title: {
        fontSize: 32,
    },

  textContainer: {
    alignItems: 'center',
    flex: 1
  },

  textFont: {
    color: '#624630'
  }
})

export default ResRecommendations;