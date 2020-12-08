import React, { createContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { COLORS } from './resources/COLORS';
import StyledLink from './components/StyledLink';
import { getSpotifyToken } from './services/spotify';
import Home from './screens/Home';
import Offline from './screens/Offline';


const defaultGlobalState = {
  key: ''
};
const globalStateContext = createContext(defaultGlobalState);
const dispatchStateContext = createContext(undefined);


const App = () => {
  const [state, dispatch] = useReducer((state, newValue) => {
      console.log(`Updating global state with value(s) ${JSON.stringify(newValue)}, arriving at state:`);
      const newState = { ...state, ...newValue }
      console.log(newState);
      return newState;
    }, defaultGlobalState
  );
  useEffect(() => {
    const authenticate = async () => {
      const { data: token, err } = await getSpotifyToken();
      if (err) {
        console.debug("Failed to authenticate");
      } else {
        dispatch({ key: token });
      }
    }
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
            <Navbar bg="dark" variant="dark">
              <Navbar.Text>
                <StyledLink to="/">
                  <TitleContainer>
                    tuneup
                  </TitleContainer>
                </StyledLink>
              </Navbar.Text>
            </Navbar>
            <AppBody>
              <Switch>
                <Route exact={true} path="/">
                  <Home/>
                </Route>
                <Route exact={true} path="/offline">
                  <Offline/>
                </Route>
              </Switch>
            </AppBody>
          </AppContainer>
        </Router>
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
}

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: ${COLORS.white};
`;

const AppBody = styled.div`
  display: inline-block;
`;

const TitleContainer = styled.h1`
  color: ${COLORS.mainBlue};
  font-size: 56px;
  display: inline-block;
`;

export default App;
