import React from 'react';
import { StyleSheet, View,Text} from 'react-native';
import MealsList from '../components/MealsList';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'; 
import HeaderButton from '../components/HeaderButton';

import { useSelector} from 'react-redux';
const FavoritesScreen = props => {
     
    const availableMeals = useSelector(state => state.meals.favMeals);
    // console.log(availableMeals);
    // const favMeals = availableMeals.filter(meal => meal.id === 'm1' || meal.id === 'm2');

    if (availableMeals.length === 0 || !availableMeals){
        return  <View style = {styles.content}>
                    <Text>
                        No Favorite Meals found. Start Adding some!!!
                    </Text>
                </View>
    }else{
        return(
            <MealsList listData = {availableMeals} navigation = {props.navigation}/>
        );
    }
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle : 'Fav Screen !!',
        headerLeft : ()=> <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                        <Item title= "Menu" iconName = "ios-menu" onPress = {() => { navData.navigation.toggleDrawer();} }/>
                    </HeaderButtons>
    };
};



const styles = StyleSheet.create({
    screen : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    content : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    }
});

export default FavoritesScreen;