import "./App.css";
import Router from "./Routes/Router";
import { BrowserRouter } from "react-router-dom";
// import { useState } from "react";

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const toggleRoute = () =>{
  //   setIsLoggedIn(!isLoggedIn)
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
