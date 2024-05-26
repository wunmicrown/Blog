// authContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/Api';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const userDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const { data: user } = await axios.get(`${API_URL}/api/v1/users/getUser`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setTokenMatch(true);
          setUser(user); 
  
        } catch (error) {
          setTokenMatch(false);
          navigate('/login');
  
        }
      }
      userDetails();
    }, [])

    return (
        <>
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
            <Footer/>
        </AuthContext.Provider>
        </>
    );
};

export default AuthContext;
