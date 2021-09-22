import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import App from './App';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom"
import CardSelf from "./components/CardSelf";

ReactDOM.render(
    <BrowserRouter>
  <React.StrictMode>
      <Switch>
          <Route exact path="/">
              <App />
          </Route>
          <Route exact path="/product/:slug">
              <CardSelf/>
          </Route>
      </Switch>
  </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);


