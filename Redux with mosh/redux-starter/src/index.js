import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from './actions'
// subscribe method returns a function to unsubscribe in case the user navigates away
// const unsubscribe = store.subscribe(() => {
//   console.log("Store Changed!", store.getState());
// });
// unsubscribe()

store.dispatch(bugAdded("Bug 1"));


// store.dispatch(bugRemoved(1));
store.dispatch(bugResolved(1));

console.log(store.getState());