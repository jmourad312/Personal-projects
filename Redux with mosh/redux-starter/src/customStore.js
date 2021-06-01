import reducer from './reducer'

function createStore (reducer) {
    let state;

    function dispatch (action) {
        // call reducer
        state = reducer(state, action);
        // notify subcribers
    }
    
    function getState () {
        return state;
    }



    return {
        dispatch,
        getState
    }
}

export default createStore(reducer)