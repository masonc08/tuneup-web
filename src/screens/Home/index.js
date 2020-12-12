import LinkContainer from "../../components/LinkContainer";
import ButtonCard from "../../components/ButtonCard";
import StyledLink from "../../components/StyledLink";
import PaddedContainer from "../../components/PaddedContainer";

const Home = () => {
  return (
    <>
      <PaddedContainer>
        Your link:
        <LinkContainer>https://github.com/masonc08/TuneUp</LinkContainer>
      </PaddedContainer>
      <StyledLink to="/offline">
        <ButtonCard>Play offline</ButtonCard>
      </StyledLink>
    </>
  );
};

export default Home;
