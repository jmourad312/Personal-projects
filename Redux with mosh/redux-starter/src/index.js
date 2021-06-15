import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugAssignedToUser,
  bugResolved,
  getUnresolvedBugs,
  getBugsByUser
} from "./store/bugs";
import * as projectActions from "./store/projects";
import * as usersActions from "./store/users";
import * as actions from './store/api'
const store = configureStore();

store.dispatch(
  actions.apiCallBegan({
    url: "/bugs",
    onSuccess: "bugsReceived",
  })
);

// store.subscribe(() => {
//   console.log("Store Changed!");
// });

// store.dispatch((dispatch,getState)=>{
//     dispatch({type:'bugsReceived',bugs:[1,2,3]})
//     console.log(getState());
// })
// store.dispatch((dispatch,getState)=>{
//     dispatch({type:'error',payload:{message:"An error occurred!"}})
// })
// store.dispatch(usersActions.userAdded({ name: "User 1" }));
// store.dispatch(usersActions.userAdded({ name: "User 2" }));
// store.dispatch(usersActions.userAdded({ name: "User 3" }));
// store.dispatch(usersActions.userRemoved({ id: 3 }));
// store.dispatch(bugAdded({ description: "bug 1" }));
// store.dispatch(bugAdded({ description: "bug 2" }));
// store.dispatch(bugAdded({ description: "bug 3" }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(bugRemoved({id:2}));
// store.dispatch(projectActions.projectAdded({ name: "Project 1" }));
// store.dispatch(projectActions.projectAdded({ name: "Project 2" }));
// store.dispatch(projectActions.projectAdded({ name: "Project 3" }));
// store.dispatch(projectActions.projectRemoved({ id: 2 }));
// store.dispatch(projectActions.projectRemoved({ id: 3 }));
// console.log(store.getState());
// const unresolverBugs = getUnresolvedBugs(store.getState());
// const bugs = getBugsByUser(1)(store.getState())
// console.log(unresolverBugs);
// console.log(bugs);
