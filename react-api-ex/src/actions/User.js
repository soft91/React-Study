import fetchJsonp from 'fetch-jsonp';
import {replace} from 'react-router-redux';

const API_URL = "https://api.github.com/users";

const startRequest = category => ({
    type : 'START_REQUEST',
    payload: { category }
});

const receiveData = (category, error, response) => ({
    type: 'RECEIVE_DATA',
    payload: { category, error, response }
})

const finishRequest = category => ({
    type: 'FINISH_REQUEST',
    payload: { category }
})

export const fetchUser = user => {
    return async (dispatch, getState) => {
        const categories = getState().users.categories;
        const category = categories.find(category => (category.id === user));
        if(typeof category === 'undefined'){
            dispatch(replace('/'));
            return;
        }

        dispatch(startRequest(category));
        
        try{
            const response = await fetchJsonp(`${API_URL}/${user}/repos`);
            const data = await response.json();
            dispatch(receiveData(category, null, data));
        }catch(err){
            dispatch(receiveData(category, err));
        }
        dispatch(finishRequest(category));
    }
}