import React, { Component } from "react";
import "./App.css";
import Movies from './components/movies';

export default class App extends Component {
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}
