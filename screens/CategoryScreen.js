import React from 'react';
import { StyleSheet, FlatList} from 'react-native';

import {CATEGORIES} from '../data/dummy-data';

import CategoryGridStyle from '../components/CaterogyGridStyle';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'; 
import HeaderButton from '../components/HeaderButton';



const CategoryScreen = props => {
    // console.log(props);
    const renderGridItem = (itemData) => {
        return (<CategoryGridStyle 
                    title = {itemData.item.title}
                    color = {itemData.item.color}
                    onSelect = {()=>{
                        props.navigation.navigate({
                            routeName : 'CategoryMeals',
                             params : {
                                categoryId : itemData.item.id
                            }
                        });
                    }}
                />
        )}
    return(
        // <View style = { styles.screen }>
        //     <Text> The Categories Screen!</Text>
        //     <Button 
        //         title ='Go to Meals'
        //         onPress = {() => {
        //             props.navigation.navigate({routeName: 'CategoryMeals'})
        //         }}
        //     />
        // </View>
        <FlatList
            data = {CATEGORIES}  
            numColumns={2}
            renderItem={renderGridItem}
        />
    );
};

CategoryScreen.navigationOptions = (navData) => {
    return {
        headerTitle : 'Meal Categories',
        headerLeft : ()=> <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                        <Item title= "Menu" iconName = "ios-menu" onPress = {() => { navData.navigation.toggleDrawer();} }/>
                    </HeaderButtons>
    };
};
const styles = StyleSheet.create({

});

export default CategoryScreen;