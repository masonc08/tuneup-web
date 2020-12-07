import LinkContainer from '../../components/LinkContainer';
import ButtonCard from '../../components/ButtonCard';
import StyledLink from '../../components/StyledLink';


const Home = () => {
  return (
    <>
      <p>
      Your link:
      <LinkContainer>
        https://github.com/masonc08/TuneUp
      </LinkContainer>
      </p>
      <StyledLink to="/offline">
        <ButtonCard>
          Play offline
        </ButtonCard>
      </StyledLink>
    </>
  );
};

export default Home;