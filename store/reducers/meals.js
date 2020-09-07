import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals : MEALS,
    filteredMeals : MEALS,
    favMeals: []
};

const mealsReducer = (state = initialState,action) => {
    switch(action.type){
        case TOGGLE_FAVORITE :
            const existingIndex = state.favMeals.findIndex(meal => meal.id === action.mealId);
            if(existingIndex >=0 ){
                const updatedFavMeals = [ ...state.favMeals];
                updatedFavMeals.splice(existingIndex,1);
                return { ...state, favMeals : updatedFavMeals};
            } else{
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state , favMeals : state.favMeals.concat(meal)}
            }
        case SET_FILTERS :
            const appliedFilter = action.filters;
            const updateFilteredMeals = state.meals.filter(meal => {
                if(appliedFilter.glutenFree && ! meal.isGlutenFree)
                    return false;
                if(appliedFilter.lactoseFree && ! meal.isLactoseFree)
                    return false;
                if(appliedFilter.vegetarian && ! meal.isVegetarian)
                    return false;
                if(appliedFilter.vegan && ! meal.isVegan)
                    return false;

                return true;
                });
                return {...state, filteredMeals : updateFilteredMeals }

        default :
                return state;
    }
};

export default mealsReducer;