
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';


export const START_LOADING = 'START_LOADING'
export const STOP_LOADING = 'STOP_LOADING'

import decode from 'jwt-decode'

export function startLoading() {
  console.log('start load');
    return {type: START_LOADING, loading: true}
}

export function stopLoading() {
  console.log('stop loading');
    return {type: STOP_LOADING, loading: false}
}
