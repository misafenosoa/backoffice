import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Deconnection() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the access token from local storage
    localStorage.removeItem('accessToken');

    // Redirect to the home page
    navigate('/');
  }, [navigate]);

  return null; // This component doesn't render anything
}
