import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { COLORS } from './resources/COLORS';
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <AppContainer>
      <Helmet>
        <style>{`body { background-color: ${COLORS.black}; }`}</style>
      </Helmet>
      <Navbar bg="dark" variant="dark">
        <Navbar.Text>
          <TitleContainer>
            tuneup
          </TitleContainer>
        </Navbar.Text>
      </Navbar>
      <AppBody>
        <p>
          Your link:
          <LinkContainer>
            https://github.com/masonc08/TuneUp
          </LinkContainer>
        </p>
      </AppBody>
    </AppContainer>
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

const LinkContainer = styled.div`
  color: ${COLORS.grey};
  border-style: none none solid none;
  border-bottom-color: ${COLORS.mainBlue};
  border-bottom-width: thick;
  padding: 1rem;
`;

const TitleContainer = styled.h1`
  color: ${COLORS.mainBlue};
  font-size: 56px;
`;

export default App;
