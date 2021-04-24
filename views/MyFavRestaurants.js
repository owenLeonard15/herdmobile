import React from 'react';
import { useState, useEffect } from 'react';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Auth from '@aws-amplify/auth';

const MyFavRestaurants = ({navigation}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [restaurantList, setRestaurantList] = useState([]);

    // Get the current user.
    useEffect(() => {
        const init = async() => {
            const currentUser = await Auth.currentAuthenticatedUser();
            console.log(currentUser);
            setCurrentUser(currentUser);
        };

        init();
    }, []);


    // Get the favorite restaurant list of the current user.
    useEffect(() => {
        const getFaveRestaurants = async() => {
            // Get the favorite restaurants of the current user.
            const resList = await getFavsOfCurrentUser();
            let resArray = [];

            // Here we extract and store only the data that we want to keep from the list of complete objects
            for (var i = 0; i < resList.length; i++){
                resArray.push({
                    name: resList[i].resName,
                    icon: resList[i].resImageUrl,
                    types: resList[i].resCategories,
                    vicinity: resList[i].resAddress
                });
            }

            setRestaurantList(resArray);
        };

        if (currentUser !== null) {
            getFaveRestaurants();
        }

    }, [currentUser, restaurantList]);

    // Fetch favorite restaurants of the current user.
    const getFavsOfCurrentUser = async() => {
      const url = 'https://i7vva9aayi.execute-api.us-east-2.amazonaws.com/dev/getfavres/' + currentUser.username;
      const res = await fetch(url);
      const resJson = await res.json();
      return resJson.items;
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
            </View>
            :  <View style={{height: 150, width: '100%', alignItems: 'center', flex: 1, flexDirection: 'row', margin: 10, padding: 15, borderBottomColor: 'white', borderBottomWidth: 1}}>

        </View>
        );
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
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>My Favorite Restaurants</Text>
            </View>
            <View style={styles.mainContent}>
                <Text>Loading Favorite Restaurants ...</Text>
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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>My Favorite Restaurants</Text>
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

export default MyFavRestaurants;