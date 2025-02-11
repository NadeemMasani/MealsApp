import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Switch,Platform} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'; 
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals'

const FilterSwitch = props => {
    return (            
        <View style = {styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor = {{ true : Colors.primaryColor }}
                thumbColor = {Platform.OS ==='android' ?Colors.primaryColor : ''}
                value = {props.state} 
                onValueChange = {props.onChnage}
            />
        </View>
    );
}

const FiltersScreen = props => {
    const { navigation } = props;
    const [isGlutenFree,setIsGlutenFree]= useState(false);
    const [isLactoseFree,setIsLactoseFree]= useState(false);
    const [isVegan,setIsVegan]= useState(false);
    const [isVegetarian,setIsVegetarian]= useState(false);
    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree : isGlutenFree,
            lactoseFree : isLactoseFree,
            vegan : isVegan,
            vegetarian : isVegetarian

        };

        dispatch(setFilters(appliedFilters));
    },[isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

    useEffect(()=> {
        navigation.setParams({save : saveFilters});
    }, [saveFilters]);

    return(
        <View style = { styles.screen }>
            <Text style = {styles.title}> Available Filters/ Restrictions</Text>
            <FilterSwitch 
                label = "Gluten-Free" 
                state = {isGlutenFree} 
                onChnage ={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch 
                label = "Lactose-Free" 
                state = {isLactoseFree} 
                onChnage ={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch 
                label = "Vegan" 
                state = {isVegan} 
                onChnage ={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch 
                label = "Vegetarian" 
                state = {isVegetarian} 
                onChnage ={newValue => setIsVegetarian(newValue)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        alignItems : 'center',
    },
    title : {
        fontFamily : 'open-sans',
        fontSize : 22,
        margin : 20,
        textAlign : 'center'
    },
    filterContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : '80%',
        marginVertical : 15
    }
});

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle : 'Filters Screen !!',
        headerLeft : ()=> (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
                        <Item title= "Menu" iconName = "ios-menu" onPress = {() => { navData.navigation.toggleDrawer();} }/>
                    </HeaderButtons>) ,
        headerRight : ()=> (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
                            <Item
                                title= "Menu" 
                                iconName = "ios-save" 
                                onPress = {
                                    navData.navigation.getParam('save')
                                }
                            />
                         </HeaderButtons>)        
        
    };
};

export default FiltersScreen;