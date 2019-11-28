const getUser = response => {
    const repos = [];
    const itemLength = response.data.length;
    for(let index = 0; index < itemLength; index++){
        const item = response.data[index];
        repos.push({
            name: item.name,
            description: item.description,
            url: item.html_url
        })
    }
    return repos;
};

const initialState = {
    category: undefined,
    resps: undefined,
    error: false
};

export default (state = initialState, action) => {
    switch(action.type){
        case 'START_REQUEST':
            return {
                category: action.payload.category,
                repos: undefined,
                error: false
            };
        case 'RECEIVE_DATA':
            return action.payload.error
                ? { ...state, error: true}
                : {
                    ...state,
                    repos: getUser(action.payload.response)
                };
        default:
            return state;
    }
}