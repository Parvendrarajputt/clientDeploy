import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { toast } from 'react-toastify';
import TestUser from '../Buttons/TestUser';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Image = styled('img')({
  width: 100,
  display: 'flex',
  margin: 'auto',
  padding: '50px 0 0',
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;

  @media (max-width: 600px) {
    height: 40px;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);

  @media (max-width: 600px) {
    height: 40px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 9px;
  }
`;

const loginInitialValues = {
  username: '',
  password: '',
};

const signupInitialValues = {
  name: '',
  username: '',
  password: '',
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState('');
  const [account, toggleAccount] = useState('login');

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const imageURL =
    'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      let response = await API.userLogin(login);

      if (response.isSuccess) {
        showError('');
        toast.success('Login Successful!');

        sessionStorage.setItem(
          'accessToken',
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          'refreshToken',
          `Bearer ${response.data.refreshToken}`
        );
        setAccount({
          name: response.data.name,
          username: response.data.username,
        });

        isUserAuthenticated(true);
        setLogin(loginInitialValues);

        navigate('/');
      } else if (response.status === 400) {
        navigate('/account');
        toast.error('Invalid username or password');
      } else {
        showError(response.data.msg || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Enter correct credentials');
    }
  };
  const handleTestUserLogin = async () => {
    try {
      // Call the testUser API
      const testUserResponse = await API.testUser();
  
      // Handle the response from the testUser API
      if (testUserResponse.isSuccess) {
        showError('');
  
        sessionStorage.setItem('accessToken', `Bearer ${testUserResponse.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${testUserResponse.data.refreshToken}`);
        setAccount({
          name: testUserResponse.data.name,
          username: testUserResponse.data.username,
        });
  
        isUserAuthenticated(true);
        toast.success('You are now a Test User!');
  
        setLogin(loginInitialValues);
        navigate('/');
      } else {
        showError(testUserResponse.data.msg || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error during test user login:', error);
      toast.error('Failed to log in as Test User');
    }
  };
  
  

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        showError('');
        setSignup(signupInitialValues);
        toast.success('Account Created!');
        toggleAccount('login');
      } else {
        navigate('/account');
        showError('Something went wrong! Please try again later');
      }
    } catch (error) {
      navigate('/account');
      showError('Something went wrong! Please try again later');
    }
  };

  const toggleSignup = () => {
    account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
  };

 


  return (
    <Component>

      <Box>
        <Image src={imageURL} alt="blog" />
        {account === 'login' ? (
          <Wrapper>
            <TestUser
              variant="contained"
              onClick={() => {
                setTimeout(() => {
                  handleTestUserLogin();  // Call your function after 1.5 seconds
                }, 1500);
              }}
            />
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <SignupButton onClick={() => toggleSignup()}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <LoginButton onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
