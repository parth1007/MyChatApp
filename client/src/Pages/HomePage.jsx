import React from 'react'
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  // Redirect to login page
  useEffect(() => {
    navigate("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <h1>HomePage</h1>
  )
}

export default HomePage