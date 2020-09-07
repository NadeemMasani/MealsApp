import React, {useEffect, useCallback} from 'react';
import {ScrollView,View, Text, StyleSheet, Button, Image} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import  HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
    return <View style = {styles.listItem}>
                <DefaultText>
                    {props.children}
                </DefaultText>
            </View>
};

const MealDetailsScreen = props => {
    const mealId = props.navigation.getParam('mealId');
    const availableMeals = useSelector( state => state.meals.meals);
    const currMealIsFavorite = useSelector(state => state.meals.favMeals.some(meal => meal.id === mealId));
    const selectedMeal = availableMeals.find( meal => meal.id === mealId);


    const dispatch = useDispatch();

    const toggleFavHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
        console.log(mealId);
    },[dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav : toggleFavHandler});
    },[toggleFavHandler]);

    useEffect(() => {
        props.navigation.setParams({isFav : currMealIsFavorite});
    },[currMealIsFavorite]);

    return(
        <ScrollView>
            <Image source = {{uri : selectedMeal.imageUrl}} style={styles.image} />
            <View style = {styles.detail}>
                        <DefaultText>
                            {selectedMeal.duration} mins
                        </DefaultText>
                        <DefaultText>
                            {selectedMeal.complexity.toUpperCase()}
                        </DefaultText>
                        <DefaultText>
                            {selectedMeal.affordability.toUpperCase()}
                        </DefaultText>
            </View>
            <Text style ={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(
                ingredient => <ListItem key = {ingredient}> {ingredient}</ListItem>
            )}
            <Text style ={styles.title}>Steps</Text>
            {selectedMeal.steps.map(
                step => <ListItem key = {step}> {step}</ListItem>
            )}
        </ScrollView>
    );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav')
    // const selectedMeal = availableMeals.find( meal => meal.id === mealId);

    const isFav = navigationData.navigation.getParam('isFav');

    return {
        headerTitle : mealTitle,
        headerRight : () => <HeaderButtons HeaderButtonComponent ={HeaderButton}>
                                <Item 
                                    title ='Favorite' 
                                    iconName = {isFav ? 'ios-star':'ios-star-outline'}
                                    onPress = {toggleFavorite}
        />
        </HeaderButtons>
    };
}

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 200,
    },
    detail : {
        flexDirection : 'row',
        padding : 15,
        justifyContent : 'space-around'
    },
    title : {
        fontFamily : 'open-sans-bold',
        fontSize : 22,
        textAlign : 'center'
    },
    listItem : {
        marginVertical : 10,
        marginHorizontal : 20,
        borderColor : '#ccc',
        borderWidth : 1,
        padding : 8

    }
});

export default MealDetailsScreen;