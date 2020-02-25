// Initial State
const initialState = {
    loginData: Object
};
// Redux: Counter Reducer
export const loginReducer = (state = initialState, action) => {

    switch (action.type) {

        case '@@LOGIN': {
            const data = action.data;
            return {
                ...state,
                loginData: data
            };
        }

        default: {
            return state;
        }
    }
};