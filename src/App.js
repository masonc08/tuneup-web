import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  defaultGlobalState,
  globalStateContext,
  dispatchStateContext,
} from "./services/context";
import { COLORS } from "./resources/COLORS";
import StyledLink from "./components/StyledLink";
import { getSpotifyToken } from "./services/spotify";
import Home from "./screens/Home";
import Offline from "./screens/Offline";

const App = () => {
  // TODO: Add loading screen for API calls
  const [state, dispatch] = useReducer((state, newValue) => {
    const newState = { ...state, ...newValue };
    console.log(
      `Updating global state with value(s): `,
      newValue,
      `arriving at state: `,
      newState
    );
    return newState;
  }, defaultGlobalState);
  useEffect(() => {
    const authenticate = async () => {
      const { data: token, err } = await getSpotifyToken();
      if (err) {
        console.debug("Failed to authenticate");
      } else {
        dispatch({ key: token });
      }
    };
    authenticate();
  }, []);

  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        <Router>
          <AppContainer>
            <Helmet>
              <style>{`body { background-color: ${COLORS.black}; }`}</style>
            </Helmet>
            <Navbar bg={COLORS.black} variant="dark">
              <img
                src="/tuneup.png"
                width="75"
                height="75"
                className="d-inline-block align-top"
              />
              <Navbar.Brand href="/">
                <TitleContainer>tuneup</TitleContainer>
              </Navbar.Brand>
            </Navbar>
            <AppBody>
              <Switch>
                <Route path={`/offline`}>
                  <Offline />
                </Route>
                <Route path={`/`}>
                  <Home />
                </Route>
              </Switch>
            </AppBody>
          </AppContainer>
        </Router>
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  background: ${COLORS.black};
  color: ${COLORS.white};
`;

const AppBody = styled.div`
  display: inline-block;
  background: ${COLORS.black};
`;

const TitleContainer = styled.h1`
  color: ${COLORS.mainBlue};
  font-size: 56px;
  display: inline-block;
`;

export default App;
