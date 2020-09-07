import React from 'react';
import { View, StyleSheet} from 'react-native';
import MealsList from '../components/MealsList';
import {CATEGORIES } from '../data/dummy-data';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';


const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find( cat => cat.id === catId);
    const availableMeals = useSelector(state=> state.meals.filteredMeals);
    const displayMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >=0 );

    if (displayMeals.length === 0){
        return  <View style = {styles.content}>
                    <DefaultText> No Meals Found for this category!!!, check your filters</DefaultText>
                </View>
    }
    return(
        <MealsList
            listData = {displayMeals}
            navigation = {props.navigation}
        />
    );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find( cat => cat.id === catId);

    return {
        headerTitle : selectedCategory.title,
    }
};

const styles = StyleSheet.create({
    content : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
});

export default CategoryMealsScreen;