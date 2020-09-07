import React from 'react',
import {View,Text,StyleSheet} from 'react-native';

const CategoryGridStyle = props => {
    return (
        <TouchableOpacity 
        style = {styles.gridItemStyle} 
        onPress = {()=>{
        props.navigation.navigate({routeName : 'CategoryMeals', params : {
            categoryId : itemData.item.id
        }});
        }}
     >
        <View >
            <Text>{itemData.item.title}
            </Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    gridItemStyle : {
        flex : 1,
        margin : 15,
        height : 150
    }

});

export default CategoryScreenGrid; 