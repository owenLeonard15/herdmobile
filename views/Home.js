import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {
    // Store and manage the fetched restaurant list.
    const [restaurantList, setRestaurantList] = useState([]);

    // Initialize the restaurant list.
    useEffect(() => {
        const init = async() => {
            const resList = await getRestaurantsFromApi();
            setRestaurantList(restaurantList => {
                for (var i = 0; i < resList.length; i++){
                    restaurantList.push(resList[i]);
                }
            })
            console.log(restaurantList);
        };

        init();
    }, []);

    // Fetch restaurants with Google Places API under the hood.
    const getRestaurantsFromApi = async() => {
      const res = await fetch('https://i7vva9aayi.execute-api.us-east-2.amazonaws.com/dev/restaurants');
      const resJson = await res.json();
      return resJson.items;
    }

    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default HomeScreen;
