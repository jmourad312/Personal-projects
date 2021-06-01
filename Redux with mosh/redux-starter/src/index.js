import store from "./store";
import * as actions from './actions'
import customStore from './customStore'

// subscribe method returns a function to unsubscribe in case the user navigates away
// const unsubscribe = store.subscribe(() => {
//   console.log("Store Changed!", store.getState());
// });
// unsubscribe()
console.log(customStore);
console.log(store);
customStore.dispatch(actions.bugAdded("custom bug"))


// store.dispatch(actions.bugAdded("bug 1"));
// store.dispatch(actions.bugRemoved(1));
// store.dispatch(actions.bugResolved(1));
// console.log(store.getState());


console.log(customStore.getState());