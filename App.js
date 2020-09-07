import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import {enableScreens} from 'react-native-screens';
import MealsNavigator from './navigation/MealsNavigator';
import { createStore, combineReducers } from 'redux';
import mealsReducer from './store/reducers/meals';
import {Provider} from 'react-redux';
enableScreens();

const rootReducer = combineReducers({
  meals : mealsReducer
});

const store = createStore(rootReducer);
export default function App() {

  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
          <Provider store = {store}>
            <MealsNavigator/>
          </Provider>
  );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text :{
    fontFamily : 'open-sans-bold'
  }
});
