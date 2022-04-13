import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main";
import { mainStore } from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={mainStore}>
        <Router>
          <Main />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
