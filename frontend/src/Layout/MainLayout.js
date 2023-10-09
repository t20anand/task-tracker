import React, { useEffect } from 'react'
import BootNavbar from '../Components/BootNavbar'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../Config/constant';
import { getLocalStorageData } from '../utils/localStorageHandler';

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  
  useEffect(()=>{
    const accessToken = getLocalStorageData(AUTH_TOKEN_KEY.accessTokenKey)
    if(!accessToken){
      navigate('/login');
    } 
  },[]);

  return (
    <>
      <BootNavbar />
      <br></br>
      <Container>
        {children}
      </Container>
    </>
  )
}
