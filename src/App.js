import React from "react";
import { Route } from "react-router-dom";
import { Header } from "./components/header"
import { Home } from "./pages/home";
import { Policy } from "./pages/policy";
import { Post } from './pages/post'

import "./style/index.css"
function App() {
  return (
    <div className="App">
      <Header/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/policy" component={Policy} />
      <Route exact path="/post" component={Post} />
    </div>
  );
}

export default App;
