
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
  width: 100%;
  height: 50vh;
  position: relative;
  background-image: url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;

  /* Overlay with gradient for better readability */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%);
  }

  /* Hover effect for smoother interaction */
  transition: box-shadow 0.3s;
  box-shadow: 0 0 0 0 transparent;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Add a subtle box shadow on hover */
  }
`;


const Heading = styled(Typography)`
  font-size: 70px;
  color: #FFFFFF;
  line-height: 1;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); /* Increase the text shadow for better contrast */
  margin-bottom: 20px; /* Add more space between the heading and subheading */
`;





const SubHeading = styled(Typography)`
  font-size: 20px;
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 5px;

  /* Animation settings */
  animation: float 3s infinite;
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const Banner = () => {
    
    return (
        <Image> 
            <Heading>Blogs for Every Passion</Heading>
            <SubHeading>Join Our Blogger Community</SubHeading>
        </Image>
    )
}

export default Banner;