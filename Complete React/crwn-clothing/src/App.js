import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase/firebase.utils";
import Header from "./components/header/Header.component";
import Homepage from "./pages/homepage/Hompage.component";
import ShopPage from "./pages/shop/ShopPage.component";
import SignInAndSignOut from "./pages/sign-in-and-out/SignInAndSignOut.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignOut} />
        </Switch>
      </div>
    );
  }
}

export default App;
