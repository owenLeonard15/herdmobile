import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

//amplify
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
Amplify.configure(config);

//Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Screens
import SplashScreen from './views/Splash'
import LoginScreen from './views/Auth/Login';
import SignUpScreen from './views/Auth/SignUp';
import HomeScreen from './views/Home';



/**
 * rootstack is the parent of AuthStack and AppDrawer
 * Overall structure of the application is as follows:
 * Root
 * -> Splash (loading page)
 * -> AuthStack
 * -> AppDrawer
 *
 * AuthStack
 * -> Login
 * -> Sign Up
 *
 * AppDrawer
 * -> Nothing here yet
 */

const Auth = createStackNavigator();
const AuthStack = () => (
    <Auth.Navigator
        intitialRouteName='Login'
        screenOptions={{
            animationEnabled: false
        }}
        headerMode='none'>
        
        <Auth.Screen name='Login' component={LoginScreen} />
        <Auth.Screen name='SignUp' component={SignUpScreen} />
    </Auth.Navigator>
)

const Application = createDrawerNavigator();
const AppDrawer = () => (
    <Application.Navigator 
        intitialRouteName='Home'
    >
        <Application.Screen name='Home' component={HomeScreen} />
    </Application.Navigator>
)

const rootStack = createStackNavigator();

function App(){

const [loading, setLoading] = useState(false);
const [userToken, setUserToken] = useState("token");

  return (
            <NavigationContainer>
                <rootStack.Navigator>
                    {
                        /* 
                    if loading, display splash sceen
                    else not loading, check for userToken to determine if user is already signed in
                        if no userToken is found, sign in or register
                        else userToken is found, app is displayed 
                    */
                        loading ? (
                            <rootStack.Screen
                                name='Splash'
                                options={{ headerShown: false }}
                                component={SplashScreen}
                            />
                        ) : userToken == null ? (
                            <rootStack.Screen
                                name='Auth Stack'
                                options={{ headerShown: false }}
                                component={AuthStack}
                            />
                        ) : (
                            <rootStack.Screen
                                name='Home'
                                options={{ headerShown: false }}
                                component={AppDrawer}
                            />
                        )
                    }
                </rootStack.Navigator>
            </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App, {
    signUpConfig: {
        hiddenDefaults: ['phone_number']
    }
});