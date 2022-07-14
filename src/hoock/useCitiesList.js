import { useReducer } from 'react';

const initialState = {
    inputValue: '',
    editingCity: '',
    editCity: false,
    citiesList: JSON.parse(localStorage.getItem('citiesList')) || []
};

const reduser = (state, action) => {
    switch(action.type) {
        case 'ADD_CITY': {
            const newState = {...state, citiesList: [...state.citiesList,action.payload]};
            state.inputValue = ''
            return newState;
        }
        case 'DELETE_CITY':{
            const newArray = state.citiesList.filter(el => el !== action.payload);
            return {...state, citiesList: newArray}
        }
        case 'EDIT_CITY': {
            state.editingCity = action.payload;
            let inputValue = state.inputValue;
            inputValue = action.payload;
            state.editCity = true
            return {...state, inputValue}
        }
        case 'CHANGE_INPUT_VALUE': {
            let inputValue = state.inputValue;
            inputValue = action.payload;
            return {...state, inputValue}
        }
        case 'EDIT_CITY_DONE': {
            const filteredArray = state.citiesList.filter(el => el !== state.editingCity);
            const newArray = [...filteredArray, action.payload];
            state.inputValue = '';
            state.editCity = false;
            return {...state, citiesList: newArray};
        }
        default: {
            return state
        }
    }
}

export const useCitiesList = () => {
    const [state, dispatch] = useReducer(reduser, initialState);
    return [state, dispatch]
}
