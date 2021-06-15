import configureStore from "./store/configureStore";
import { loadBugs,assignBugToUser } from "./store/bugs";

const store = configureStore();
// UI layer
// store.dispatch(addBug({description:"xyz"}));
store.dispatch(loadBugs());

setTimeout(() => {
    store.dispatch(assignBugToUser(1,4));
}, 2000);

