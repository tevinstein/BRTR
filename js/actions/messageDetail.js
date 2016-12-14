
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';

export const LOAD_MESSAGES = 'LOAD_MESSAGES'
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS'
export const LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE'
export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS'
export const ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE'

import decode from 'jwt-decode'

const SERVER_URL_USERS = 'http://localhost:3000/api'

export function loadMessages() {
    return {type: LOAD_MESSAGES}
}

export function loadMessagesSuccess(messages) {
    return {type: LOAD_MESSAGES_SUCCESS, messages: messages}
}

export function loadMessagesFailure() {
    return {type: LOAD_MESSAGES_FAILURE}
}

export function getMessages(token,id) {
    return (dispatch) => {
        dispatch(loadMessages())
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/messages/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                dispatch(loadMessagesSuccess(responseJson))
            })
            .catch((error) => {
                Alert.alert(
                    'Load Messages Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(loadMessagesFailure())
            });
    }
}

export function addMessageSuccess(message) {
    return {type: ADD_MESSAGE_SUCCESS, message: message}
}

export function addMessageFailure() {
    return {type: ADD_MESSAGE_FAILURE}
}

export function addMessage(token,body,itemMessageId) {
    return (dispatch) => {
        const userDecoded = decode(token)
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/messages`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                body: body,
                UserId: userDecoded.id,
                ItemMessageId: itemMessageId,
                status: 'unread'
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(getMessages(token, itemMessageId))
            })
            .catch((error) => {
                console.log("fail add message detail: ", error)
                Alert.alert(
                    'Add Message Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(addMessageFailure())
            });
    }
}
