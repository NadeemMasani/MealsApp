import React from 'react';
import { FlatList,StyleSheet, View } from 'react-native';
import MealItem from '../components/MealItem';
import {useSelector} from 'react-redux';

const MealsList = props => {

    const favoriteMeals = useSelector(state => state.meals.favMeals);

    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
        return( <MealItem 
                    title = {itemData.item.title}
                    onSelectMeal = {()=>{
                        props.navigation.navigate({routeName : 'MealDetail', params : {
                            mealId : itemData.item.id,
                            mealTitle : itemData.item.title,
                            isFav : isFavorite
                        }});
                    }}
                    duration = {itemData.item.duration}
                    complexity = {itemData.item.complexity}
                    affordability = {itemData.item.affordability}
                    image = {itemData.item.imageUrl}
                />
        );
    };
    return (
        <View style = { styles.list }>
        {/* <Text> The Categories Meals Screen!</Text>
         <Text>{selectedCategory.title}</Text>
        <Button 
            title ='Go to Meal Details'
            onPress = {() => {
                props.navigation.navigate({routeName: 'MealDetail'})
            }}
        />
        <Button 
            title = 'Go Back'
            onPress = {() => {
                props.navigation.pop()
            }}
        /> */}

        <FlatList 
            data={props.listData}
            keyExtractor={(item,index) => item.id}
            renderItem = {renderMealItem}
            style = {{width : '100%'}}
        />
    </View>

    );

};

const styles = StyleSheet.create({
    list : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }
});

export default MealsList;