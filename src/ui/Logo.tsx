import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10.8rem;
  width: auto;
`;

const Logo = () => {
  const src: string = '/logo-light.png';

  return (
    <StyledLogo>
      <Img src={src} alt='Logo' />
    </StyledLogo>
  );
};

export default Logo;
