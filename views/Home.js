import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Auth from '@aws-amplify/auth';

function HomeScreen({ navigation }){

    const signOut = () => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    return (
        <View style={styles.container}>
            <View style={styles.topLeft}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <MaterialIcons name="menu" size={40} color="#F07167" />
                </TouchableOpacity>
            </View>
            <Text>Welcome to Herd!</Text>
            <TouchableOpacity style={{marginTop: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 100, height: 35, backgroundColor: '#00AFB9', borderRadius: 4}} onPress={() => signOut()}>
                <Text style={{ color: 'white'}}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FED9B7',
        alignItems: 'center',
        justifyContent: 'center',
      },
    topLeft: {
        position: 'absolute',
        top: '5%',
        left: '5%'
    }
})

export default HomeScreen;
