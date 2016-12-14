
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

const SERVER_URL_USERS = 'http://localhost:3000/api'

export function userRegisterSuccess(user):Action {
    return {
        type: USER_REGISTER_SUCCESS,
        user: user
    };
}

export function userRegisterFailure():Action {
    return {
        type: USER_REGISTER_FAILURE
    };
}

export function registerUser(username, password, email, confirmPassword, navigator) {
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                confirmPassword: confirmPassword
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(userRegisterSuccess(responseJson))
                AsyncStorage.setItem('myKey', responseJson);
                navigator.replace({id: 'home'})
            })
            .catch((error) => {
                console.log("fail", error)
                Alert.alert(
                    'Register Fail',
                    'something wrong, please register again',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(userRegisterFailure())
            });
    }
}


export function userLoginSuccess(user):Action {
    return {
        type: USER_LOGIN_SUCCESS,
        user: user
    };
}

export function userLoginFailure():Action {
    return {
        type: USER_LOGIN_FAILURE
    };
}

export function loginUser(username, password, navigator) {
  console.log('func login action');
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log("ini respon json: ", responseJson)
                if (responseJson) {
                    dispatch(userLoginSuccess(responseJson))
                    AsyncStorage.setItem('myKey', responseJson);
                    navigator.replace({id: 'home'})
                }
            })
            .catch((error) => {
                console.log("fail", error)
                Alert.alert(
                    'Login Fail',
                    `${error.message}`,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(userLoginFailure())
            });
    }
}
