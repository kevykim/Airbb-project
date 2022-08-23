import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from './components/SignUpFormPage'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsHomePage from "./components/SpotsHomePage";
import SpotsDetailPage from "./components/SpotsDetailPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <SpotsHomePage />
          </Route>
          <Route exact path='/spots/:id'>
            <SpotsDetailPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
