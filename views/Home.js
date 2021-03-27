import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {
    // Store and manage the fetched restaurant list.
    const [restaurantList, setRestaurantList] = useState([]);
    // Store and manage the location of the current user
    // Should have at least 4 decimal places to enable nearby search.
    // Currently are hard-coded values, will fetch them from locating
    // services or user settings later.
    const [lat, setLat] = useState(36.1447);
    const [lon, setLon] = useState(-86.8027);

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
      const url = 'https://i7vva9aayi.execute-api.us-east-2.amazonaws.com/dev/restaurants?lat=' + lat + "&lon=" + lon;
      const res = await fetch(url);
      const resJson = await res.json();
      return resJson.items;
    }

    return (
        <View style={styles.container}>
            <FlatList
                      data={restaurantList}
                      renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
                    />
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
