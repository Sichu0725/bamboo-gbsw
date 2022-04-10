import React from "react";
import { Route } from "react-router-dom";
import { Header } from "./components/header"
import { Home } from "./components/home";
import { Policy } from "./pages/policy";

import "./style/index.css"
function App() {
  return (
    <div className="App">
      <Header/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/policy" component={Policy} />
    </div>
  );
}

export default App;
