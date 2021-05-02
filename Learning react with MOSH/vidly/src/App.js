import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import LoginForm from "./components/loginForm";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import "./App.css";
import SignupForm from "./components/signupForm";

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" exact component={MovieForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={SignupForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies"/>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}
