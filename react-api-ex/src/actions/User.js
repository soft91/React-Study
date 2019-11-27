import fetchJsonp from 'fetch-jsonp';

const API_URL = "http://api.github.com/users/";

const startRequest = user => ({
    type : 'START_REQUEST',
    payload: { user }
});

const receiveData = (user, error, response) => ({
    type: 'RECEIVE_DATA',
    payload: { user, error, response }
})

const finishRequest = user => ({
    type: 'FINISH_REQUEST',
    payload: { user }
})

export const fetchUser = user => {
    return async dispatch => {
        dispatch(startRequest(user));
        
        try{
            const response = await fetchJsonp(`${API_URL}/${user}/reops`);
            const data = await response.json();
            dispatch(receiveData(user, null, data));
        }catch(err){
            dispatch(receiveData(user, err));
        }
        dispatch(finishRequest(user));
    }
}