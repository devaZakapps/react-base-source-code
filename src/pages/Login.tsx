import { useState } from 'react';
import { Button } from '../components/ui/button';
import { getUserProfile, userLogin } from '../api/userModal';
import { UserRequest } from '../type/data/user';
import { redirectToPage } from '../utils/utils';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';

function Login() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(false);

  const handleEmailChange = (event: any) => {
    setEmailId(event.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    if (passwordError) setPasswordError('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const getUserDetails = async () => {
    const email = localStorage.getItem("user_email")
    console.log("email in localstorage: ", email)
    if (!email) {
      redirectToPage('/login', false);
    } else {
      // getProjectsByUser()

      const localstorage_userDetails = localStorage.getItem("user_details")
      console.log("localstorage_userDetails :", localstorage_userDetails)

      if (!localstorage_userDetails) {
        const userDetails = await getUserProfile(email)
        console.log("insdie getUserDetails :", userDetails)
        if (userDetails) {
          localStorage.setItem("user_details", JSON.stringify(userDetails))
        } else {
          redirectToPage('/login', false);
        }
      }
    }
  }

  const handleLoginClick = async (event: any) => {
    event.preventDefault();

    let valid = true;

    if (!emailId) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(emailId)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters long');
      valid = false;
    }

    if (valid) {
      const data: UserRequest = {
        email: emailId,
        password,
      };
      const response = await userLogin(data);
      console.log("response: ", response)
      if (response.status == 200) {
        setError(false);
        //Set access token
        if (response.headers['access_token']) {
          localStorage.setItem('session_id', response.headers['access_token']);
          localStorage.setItem('user_email', response.data.email);
          console.log("response user_email: ", response.data.email)
          getUserDetails()

          redirectToPage('/dashboard');
        }
      } else {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError(true);
          } else {
            console.error('Login failed with status:', error.response?.status);
          }
        } else {
          console.error('An unexpected error occurred', error);
        }
      }
      // redirectToPage('/')
    } else {
      // redirectToPage('/')
      setError(true);
    }
  };
  return (
    <div className="bg-[#2165f5] h-[100vh]">
      <div className="center-div absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center m-auto">
        <div className="mb-[35px]">

          <div className="flex justify-center w-[381px] items-center gap-[10px] text-white">
            <label className="text-white font-roboto text-lg font-semibold leading-normal self-stretch">
              UI - LIBRARY
            </label>            {/* <img className="shrink-0" src="src/assets/Group 524.svg" />
            <img src="/src/assets/ui-library.svg" /> */}
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col items-start gap-[5px] self-stretch">
            <label className="text-white font-roboto text-[16px] font-semibold leading-normal self-stretch">
              Email
            </label>
            <Input
              variant="default"
              type="email"
              id="emailInput"
              name="email"
              value={emailId}
              autoComplete="email"
              onChange={(e) => handleEmailChange(e)}
            ></Input>
            {emailError && (
              <span id="emailError" className="text-red-500">
                {emailError}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-[5px] self-stretch">
            <label className="text-white font-roboto text-[16px] font-semibold leading-normal self-stretch">
              Password
            </label>
            <Input
              type="password"
              id="passwordInput"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              autoComplete="current-password"
            ></Input>
            {passwordError && (
              <span id="passwordError" className="text-red-500">
                {passwordError}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              // asChild
              variant={'secondary'}
              size={'md'}
              onClick={handleLoginClick}
              className="bg-primary-black text-white"
            >
              Login

            </Button>
          </div>
          <div className="flex justify-center">
            <span className="leading-[normal] text-base not-italic font-semibold text-white">
              Forgot Password?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
