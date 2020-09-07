import React from 'react';
import { createStackNavigator} from 'react-navigation-stack';
import {Platform,Text} from 'react-native';
import { createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import CategoriesScreen from '../screens/CategoryScreen';
import CategoriesMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import { color } from 'react-native-reanimated';

    const defaultSatckNavOptions = {
        headerStyle : {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
        },
        headerTitleStyle : {
            fontFamily : 'open-sans'
        },
        headerBackTitleStye : {
            fontFamily : 'open-sans'
        },
        headerTintColor : Platform.OS ==='android'? 'white' : Colors.primaryColor,
    };

const MealsNavigator = createStackNavigator ({
        Categories : {
            screen :CategoriesScreen,
    },
    CategoryMeals: {
        screen : CategoriesMealsScreen,
     },
    MealDetail : MealDetailScreen
    },
    {
    mode : 'modal',
    initialRouteName : 'Categories',
    defaultNavigationOptions : defaultSatckNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites : FavoritesScreen,
    MealDetail : MealDetailsScreen
}, {
    mode : 'modal',
    initialRouteName : 'Favorites',
    defaultNavigationOptions : defaultSatckNavOptions
});

const tabScreenConfig = {
    Meals : {
        screen :MealsNavigator,
        navigationOptions : {
            tabBarIcon : (tabInfo) => {
            return <Ionicons name = 'ios-restaurant' size = {25} color = {tabInfo.tintColor} />
            },
            tabBarColor : Colors.primaryColor,
            tabBarLabel : Platform.OS === 'android' ? <Text style = {{fontFamily:'open-sans-bold'}}>MEALS</Text> : 'Meals'
       }
    },
    Favorites : {
        screen : FavNavigator,
        navigationOptions : {
            tabBarLabel : 'Favorites!!',
            tabBarIcon : (tabInfo) => {
            return <Ionicons name = 'ios-star' size = {25} color = {tabInfo.tintColor} />
            },
            tabBarColor : Colors.accentColor,
            tabBarLabel : Platform.OS === 'android' ? <Text style = {{fontFamily:'open-sans-bold'}}>FAV!!</Text> : 'FAV!!'

        }
    }
}
const MealsFavTabNavigator = Platform.OS === 'android' 
?   createMaterialBottomTabNavigator(tabScreenConfig,{
        activeColor : 'white',
        shifting : true
    })
: createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions : {
        labelStyle : {
            fontFamily : 'open-sans-bold'
        },
        activeTintColor : Colors.accentColor
    }
});

const filtersNavigator = createStackNavigator({
        Filters : FiltersScreen,
    }, {
        navigationOptions : {
            drawerLabel : "Filters!!!!",
        },
        defaultNavigationOptions : defaultSatckNavOptions
    }
);


const mainNavigator = createDrawerNavigator({
    MealsFav : {
        screen : MealsFavTabNavigator,
        navigationOptions : {
            drawerLabel : "Meals",
        }
    },
    Filters : filtersNavigator
},{
    contentOptions : {
        activeTintColor : Colors.accentColor,
        labelStyle : {
            fontFamily : 'open-sans-bold',
        }
    }
});

export default createAppContainer(mainNavigator); 