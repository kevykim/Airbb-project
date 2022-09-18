import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
          <Route exact path='/'>
            <SpotsHomePage />
          </Route>
          <Route exact path='/spots/:id'>
            <SpotsDetailPage />
          </Route>
          <Route exact path='/spots/current'>
            {/* My Spots Component */}
          </Route>
          <Route exact path={'/reviews/current'}>
            {/* My Reviews Component */}
          </Route>
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
