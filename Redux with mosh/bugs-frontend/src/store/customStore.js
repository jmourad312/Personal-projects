import reducer from "./reducer";

function createStore(reducer) {
  let state;
  let listners = [];

  function subscribe(listner) {
    listners.push(listner);
  }

  function dispatch(action) {
    // call reducer
    state = reducer(state, action);
    // notify subcribers
    for (let i = 0; i < listners.length; i++) {
      listners[i]();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  };
}

export default createStore(reducer);
