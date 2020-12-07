import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { COLORS } from './resources/COLORS';
import StyledLink from './components/StyledLink';
import Home from './screens/Home';

const App = () => {
  return (
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
            </Route>
          </Switch>
        </AppBody>
      </AppContainer>
    </Router>
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
