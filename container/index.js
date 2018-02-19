import React from 'react';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { BackHandler } from 'react-native';
//Main Pages
import Login from './Login';
import Register from './Register';
import Home from './Home';

export default StackNavigator({

    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null,
        }
    },

});

