// Registration Component
import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import './Registration.css';
import { GoogleLogin } from 'react-google-login';
import getCsrfToken from '../CsrfToken/CsrfToken';
import { useNavigate,Link } from 'react-router-dom';
export const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [backendError, setBackendError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Style for google login button
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    width: '391px',
    marginRight: '110px',
  };

 

  // Csrf Token
  const [csrfToken, setCsrfToken] = useState('');
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };

    fetchCsrfToken();
  }, []);
  
  // Toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGoogleLoginSuccess = (response) => {
    console.log('Google Login Success:', response);
    const { name, imageUrl } = response.profileObj;
    console.log('User Name:', name);
    console.log('Profile Picture URL:', imageUrl);
    localStorage.setItem('googleUserName', name);
    localStorage.setItem('googleUserProfileUrl', imageUrl);
    navigate('/dashboard',{imageUrl:imageUrl,name:name}); 
    const googleAccessToken = response?.tokenId;
    console.log(googleAccessToken)
    // Now you can use this token for further authentication or other actions
  };

  // Handle Google login failure
  const handleGoogleLoginFailure = (error) => {
    if (error.error === 'popup_closed_by_user') {
      console.log('Google Sign-In popup closed by the user.');
      // Optionally, display a message to the user or take any appropriate action.
    } else {
      console.error('Google Login Failure:', error);
    }
  };

  // Handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setBackendError(null);



    // Validation for all credential

    // Username  validation
    if (username.trim() === '') {
      setUsernameError('Username is required.');
    }
   
    // Email Validation
    if (email.trim() === '') {
      setEmailError('Email is required.');
    } else if (!/[^@]+@[^@]+\.[^@]+/.test(email)) {
      setEmailError('Invalid email format. Please enter a valid email.');
    }else if (!email.endsWith('@techjays.com')) {
      setEmailError('Only users with techjays.com email addresses are allowed to register.');
    }

    // Password validation
    if (password.length === 0) {
      setPasswordError('Password is required.');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one capital letter.');
    } else if (!/\d/.test(password)) {
      setPasswordError('Password must contain at least one number.');
    } else if (!/[@#$!%*?&]/.test(password)) {
      setPasswordError('Password must contain at least one special character.');
    }

    // There is no error give request to backend

    if (usernameError === '' && emailError === '' && passwordError === '') {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Errors From Backend 
      if (response.status === 400) {
        const data = await response.json();
        if (data.error.includes('Email is already in use')) {
          setEmailError(data.error);
        } else if (data.error) {
          setEmailError(data.error);
        } else {
          setBackendError('Network error: Please check your internet connection and try again.');
        }
      } else {
        // Registration is Successfull
        setShowSuccessModal(true);  // open the Modal show pop up
      }
    }
  };
  // Redirect to login
  const redirectToLogin = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
        <div   style={{marginLeft:'46px', width:'600px',backgroundColor:''}}>
          <h1 className="text-center mt-5" style={{width:'490px',fontSize:'50px',marginRight:'60px',fontWeight:'600',color:'rgba(44, 46, 44)',fontFamily:'Arial' }}>Project way</h1>
           <div style={{marginLeft:'92px'}}>
            <form onSubmit={handleRegistration}>
             <input
               className="form-control"
               type="text"
               style={{color:'black',fontSize:'17px'}}
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <div className="error-message"  style={{ paddingTop: '5px' }}>{usernameError}</div>}
            <input
               className="form-control"
               type="text"
               style={{color:'black',fontSize:'17px'}}
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error-message"  style={{ paddingTop: '5px' }}>{emailError}</div>}
            <div style={{ position: 'relative' }}>
              <input
                className="form-control"
                type={showPassword ? 'text' : 'password'}
                style={{color:'black',fontSize:'17px'}}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <span
               className="password-toggle"
               onClick={togglePasswordVisibility}
               style={{ position: 'absolute', left: '330px', cursor: 'pointer',top:'17px',color:'black',fontWeight:'400' }}
              >
              {showPassword ? 'Hide' : 'Show'}
            </span>
              {passwordError && <div className="error-message" style={{ paddingTop: '5px' }}>{passwordError}</div>}
            </div>
           {backendError && <div className="error-message mt-3">{backendError}</div>}
             <button className="btn btn-primary mt-4" style={{borderRadius:'50px',padding:'12px',width:'120px',fontSize:'20px',fontWeight:'600',marginRight:'399px',backgroundColor:'rgba(74, 30, 74)',border:'1px solid rgba(74,30,74)'}} onClick={handleRegistration}>
                Sign up
             </button>
             <Link to="/login">
             <button  className="btn btn-primary" style={{marginLeft:'170px',marginTop:'-83px',borderRadius:'50px',padding:'12px',width:'120px',fontSize:'20px',fontWeight:'600',backgroundColor:'rgba(44,46,44)',border:'1px solid rgba(44,46,44)',cursor:'pointer'}}>
               Sign in
             </button>
             </Link>
             </form>
             <div style={buttonContainerStyle}>
            <GoogleLogin
              clientId="15965859062-oct8ilh407lpgraoljnjjqehj603pb36.apps.googleusercontent.com"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <button
                  className="btn btn-primary"
                  style={{
                    borderRadius: '10px',
                    padding: '16px',
                    width: '430px',
                    fontSize: '20px',
                    fontWeight: '600',
                    backgroundColor: 'rgba(44, 46, 44)',
                    border: '1px solid rgba(74, 30, 74)',
                    outline: 'none',
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Continue with Google
                </button>
              )}
            />
          </div>
        </div>
      </div>
          <Modal className='small-modal' show={showSuccessModal} onHide={redirectToLogin}>
          <Modal.Header >
          <Modal.Title>SignUp Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your Sign Up was successful. You can now proceed to Sign in.
          </Modal.Body>
          <Modal.Footer>
          <Button style={{ marginRight: '30px' }} variant="primary" onClick={redirectToLogin}>
            Go to Sign In
          </Button>
          </Modal.Footer>
          </Modal>
          
        </Col>
      </Row>
  
  );
};

export default Registration;



