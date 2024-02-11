// Import the API base URL from the config file
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../Config';
import { useNavigate } from 'react-router-dom';






export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is already present in local storage
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      // Redirect to ValidationAnnonce if the token is present
      navigate('/statistics');
    }
  }, [navigate]);

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        utilisateur: {
          mail: username
        },
        mdp: password,
      });

      // Handle the response as needed
      const { tokenInformation } = response.data;
      const accessToken = tokenInformation.accessToken;

      // Store the access token in local storage
      localStorage.setItem('accessToken', accessToken);

      // Redirect to ValidationAnnonce
      navigate('/validation');

      console.log('Login Successful', response.data);
    } catch (error) {
      // Handle errors (e.g., display error message)
      setError('Invalid username or password. Please try again.');
      console.error('Login Failed', error);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="../../images/logo.svg" alt="logo" />
                </div>
                <h4>Hello! Let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={handleSignIn}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      SIGN IN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}