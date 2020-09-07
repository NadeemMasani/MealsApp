import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Platform, TouchableNativeFeedback} from 'react-native';

const CategoryGridStyle = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style = {styles.gridItemStyle }>
        <TouchableCmp 
        style = {{flex :1}} 
        onPress = {props.onSelect}
        >
        <View style = {{...styles.container, ...{ backgroundColor : props.color }}} >
            <Text style = {styles.title}>{props.title}
            </Text>
        </View>
    </TouchableCmp>
    </View>
    );
};

const styles = StyleSheet.create({
    gridItemStyle : {
        flex : 1,
        height : 150,
        margin :15,
        borderRadius : 10,
        overflow : Platform.OS ==='android' && Platform.Version >=21 ? 'hidden' : 'visible',
        elevation : 6,
    },
    container : {
        flex :1,
        borderRadius : 10,
        shadowOpacity : 0.26,
        elevation : 6,
        shadowOffset : {width : 0, height : 2},
        padding : 15,
        justifyContent : 'flex-end',
        alignItems : 'flex-end',
        shadowColor : 'black'

    },
    title : {
        fontFamily : 'open-sans-bold',
        fontSize : 20,
        textAlign : 'right'
    }

});

export default CategoryGridStyle; 