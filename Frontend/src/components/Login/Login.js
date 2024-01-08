// import React, { useState,useEffect } from 'react';
// import { Col,Row } from 'react-bootstrap';
// import {Link,useNavigate } from 'react-router-dom';
// import getCsrfToken from '../CsrfToken/CsrfToken';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faGoogle } from '@fortawesome/free-brands-svg-icons';

// import { GoogleLogin } from 'react-google-login';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [showPassword, setShowPassword] = useState(false); 
//   const [passwordError, setPasswordError] = useState('');
//   const navigate = useNavigate();
//   const [csrfToken, setCsrfToken] = useState('');
//   console.log(csrfToken)
//   // Fetch CSRF token on component mount
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       const token = await getCsrfToken();
//       setCsrfToken(token);
//     };

//     fetchCsrfToken();
//   }, []);

//   // Style for Google login buttonnnn

//   const buttonContainerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: '-10px',
//     width: '391px',
//     marginLeft: '50px',
//   };

 
//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Handle Google login
//   // Handle Google login success
//   const handleGoogleLoginSuccess = (response) => {
//     console.log('Google Login Success:', response);
//     const { name, imageUrl } = response.profileObj;
//     console.log('User Name:', name);
//     console.log('Profile Picture URL:', imageUrl);
//     localStorage.setItem('googleUserName', name);
//     localStorage.setItem('googleUserProfileUrl', imageUrl);
//     navigate('/dashboard',{imageUrl:imageUrl,name:name}); 
//     const googleAccessToken = response?.tokenId;
//     console.log(googleAccessToken)
//     // Now you can use this token for further authentication or other actions
//   };
//     // Include the Google access token in your backend request


//   // Handle Google login failure
//   const handleGoogleLoginFailure = (error) => {
//     if (error.error === 'popup_closed_by_user') {
//       console.log('Google Sign-In popup closed by the user.');
//       // Optionally, display a message to the user or take any appropriate action.
//     } else {
//       console.error('Google Login Failure:', error);
//     }
//   };
  
//  // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Reset any previous error messages
//     setEmailError('');
//     setPasswordError('');

//     if (email.trim() === '') {
//         setEmailError('Email is required.');
//       }
//     if(password.trim() === '') {
//         setPasswordError('Password is required.');
//       }

//     // Send a POST request to your login endpoint
//     const response = await fetch('http://127.0.0.1:8000/api/login/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': csrfToken,
      
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.status === 200) {
//       navigate('/documentation')
//       // Login successful, 
//       const data = await response.json();
//       console.log("logged")
//       const accessToken=data.token
//       console.log('Access Token:', accessToken);
//       const username =data.username
//       const userEmail = data.email;
     

//       // Store data in localStorage
//       localStorage.setItem('userEmail', userEmail);
//       localStorage.setItem('accessToken', accessToken);
//       localStorage.setItem('username',username)
//       console.log("username",username)
//       console.log('token',accessToken)
//       navigate('/documentation',{token:accessToken, email:userEmail})
     
      
     

     
//     } else {
//       // Handle login errorssssss
//       const errorData = await response.json();
//       console.log("Ds")
//       console.log("Error Data:", errorData); // Log the error data
//       console.log("Response Status:", response.status);
//       if (errorData.msg === 'Email is not specified.') {
//         setEmailError('Please enter your email.');
//       } else if (errorData.msg === 'Email does not exist.') {
//         setEmailError(errorData.msg);
//       } else if (errorData.msg === 'Password is incorrect.') {
//         setPasswordError('Incorrect password. Please try again.');
//       }
//     }
//   };
  


//   return (
//      <Row className="justify-content-center">
//     <Col xs={12} sm={8} md={6} lg={4}>
//    <div style={{ marginLeft:'46px',width:'600px' }}>
//       <h1 className="text-center mt-5" style={{width:'490px',fontSize:'50px',marginRight:'690px',fontWeight:'600',color:'rgba(44, 46, 45)',fontFamily:'sans-serif' }}>Project way</h1>
//       <div style={{marginLeft:'92px'}}>
//       <form onSubmit={handleSubmit}>
//         <input
//           className="form-control"
//           type="text"
//           style={{color:'black',fontSize:'17px'}}
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {emailError && <div className="error-message"  style={{ paddingTop: '5px' }}>{emailError}</div>}
//         <div style={{ position: 'relative' }}>
//           <input
//             className="form-control"
//             type={showPassword ? 'text' : 'password'}
//             style={{color:'black',fontSize:'17px'}}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span
//             className="password-toggle"
//             onClick={togglePasswordVisibility}
//             style={{ position: 'absolute', left: '330px', cursor: 'pointer',top:'17px',color:'black',fontWeight:'400' }}
//           >
//             {showPassword ? 'Hide' : 'Show'}
//           </span>
//           {passwordError && <div className="error-message" style={{ paddingTop: '5px' }}>{passwordError}</div>}
//         </div>
//         <button className="btn btn-primary " style={{borderRadius:'50px',padding:'12px',width:'120px',fontSize:'20px',fontWeight:'600',marginRight:'386px',marginTop:'70px',backgroundColor:'rgba(74,30,74)',border:'1px solid rgba(74,30,74)',outline:'none'}} onClick={handleSubmit}>
//           Sign in
//         </button>
//        <Link to="/registration">
//        <button  className="btn " style={{marginLeft:'170px',marginTop:'-83px',borderRadius:'50px',padding:'12px',width:'120px',fontSize:'20px',fontWeight:'600',backgroundColor:'rgba(44, 46, 44)',border:'1px solid rgba(44,46,44)',color:'white'}}>
//         Sign up
//      </button>
//       </Link>
//      </form>
//       <Link to="/forgot-password"  className='btn btn-link'   style={{ textDecoration: 'none', marginTop: '-279px', marginLeft: '-306px', whiteSpace: 'nowrap',color:'rgba(44,46,44)',fontWeight:'550',fontFamily:'Arial', }} > Forgotten your password?
//       </Link>
//       </div>
//       <div style={buttonContainerStyle}>
    
//             <div style={buttonContainerStyle}>
//             <GoogleLogin
//               clientId="15965859062-oct8ilh407lpgraoljnjjqehj603pb36.apps.googleusercontent.com"
//               onSuccess={handleGoogleLoginSuccess}
//               onFailure={handleGoogleLoginFailure}
//               cookiePolicy={'single_host_origin'}
//               render={(renderProps) => (
//                 <button
//                   className="btn btn-primary"
//                   style={{
//                     borderRadius: '10px',
//                     padding: '16px',
//                     width: '430px',
//                     fontSize: '20px',
//                     fontWeight: '600',
//                     backgroundColor: 'rgba(44, 46, 44)',
//                     border: '1px solid rgba(74, 30, 74)',
//                     outline: 'none',
//                   }}
//                   onClick={renderProps.onClick}
//                   disabled={renderProps.disabled}
//                 >
//                   Continue with Google
//                 </button>
//               )}
//             />
//           </div>
//     </div>
//     </div>
//     </Col>
//   </Row>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import getCsrfToken from '../CsrfToken/CsrfToken';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState('');

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };

    fetchCsrfToken();
  }, []);

  // Style for Google login button
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-10px',
    width: '391px',
    marginLeft: '50px',
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = async (response) => {
    console.log('Google Login Success:', response);
    const { name, imageUrl, tokenId } = response.profileObj;
    console.log('User Name:', name);
    console.log('Profile Picture URL:', imageUrl);

    // Save user details to localStorage
    localStorage.setItem('googleUserName', name);
    localStorage.setItem('googleUserProfileUrl', imageUrl);

    // Now you can use the Google access token for further authentication or other actions
    console.log('Google Access Token:', tokenId);

    // Include the Google access token in your backend request
    const backendResponse = await fetch('http://127.0.0.1:8000/api/google-login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ tokenId }), // Send the tokenId to your backend
    });

    if (backendResponse.status === 200) {
      // Handle successful backend response if needed
      const backendData = await backendResponse.json();
      console.log('Backend Response:', backendData);
      const receivedToken = backendData.token;  // Check the actual property name
      console.log('Received Token:', receivedToken);
      localStorage.setItem('accessToken', receivedToken);

      // Redirect or perform other actions as needed
      navigate('/dashboard', { state: { imageUrl, name, receivedToken } });
    } else {
      // Handle backend errors
      console.error('Backend Error:', backendResponse.statusText);
    }
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous error messages
    setEmailError('');
    setPasswordError('');

    if (email.trim() === '') {
      setEmailError('Email is required.');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required.');
    }

    // Send a POST request to your login endpoint
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      navigate('/documentation');
      // Login successful,
      const data = await response.json();
      console.log('logged');
      const accessToken = data.token;
      console.log('Access Token:', accessToken);
      const username = data.username;
      const userEmail = data.email;

      // Store data in localStorage
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);
      console.log('username', username);
      console.log('token', accessToken);
      navigate('/documentation', { token: accessToken, email: userEmail });
    } else {
      // Handle login errors
      const errorData = await response.json();
      console.log('Ds');
      console.log('Error Data:', errorData); // Log the error data
      console.log('Response Status:', response.status);
      if (errorData.msg === 'Email is not specified.') {
        setEmailError('Please enter your email.');
      } else if (errorData.msg === 'Email does not exist.') {
        setEmailError(errorData.msg);
      } else if (errorData.msg === 'Password is incorrect.') {
        setPasswordError('Incorrect password. Please try again.');
      }
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={8} md={6} lg={4}>
        <div style={{ marginLeft: '46px', width: '600px' }}>
          <h1 className="text-center mt-5" style={{ width: '490px', fontSize: '50px', marginRight: '690px', fontWeight: '600', color: 'rgba(44, 46, 45)', fontFamily: 'sans-serif' }}>Project way</h1>
          <div style={{ marginLeft: '92px' }}>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control"
                type="text"
                style={{ color: 'black', fontSize: '17px' }}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="error-message" style={{ paddingTop: '5px' }}>{emailError}</div>}
              <div style={{ position: 'relative' }}>
                <input
                  className="form-control"
                  type={showPassword ? 'text' : 'password'}
                  style={{ color: 'black', fontSize: '17px' }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  style={{ position: 'absolute', left: '330px', cursor: 'pointer', top: '17px', color: 'black', fontWeight: '400' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
                {passwordError && <div className="error-message" style={{ paddingTop: '5px' }}>{passwordError}</div>}
              </div>
              <button className="btn btn-primary " style={{ borderRadius: '50px', padding: '12px', width: '120px', fontSize: '20px', fontWeight: '600', marginRight: '386px', marginTop: '70px', backgroundColor: 'rgba(74,30,74)', border: '1px solid rgba(74,30,74)', outline: 'none' }} onClick={handleSubmit}>
                Sign in
              </button>
              <Link to="/registration">
                <button className="btn " style={{ marginLeft: '170px', marginTop: '-83px', borderRadius: '50px', padding: '12px', width: '120px', fontSize: '20px', fontWeight: '600', backgroundColor: 'rgba(44, 46, 44)', border: '1px solid rgba(44,46,44)', color: 'white' }}>
                  Sign up
                </button>
              </Link>
            </form>
            <Link to="/forgot-password" className='btn btn-link' style={{ textDecoration: 'none', marginTop: '-279px', marginLeft: '-306px', whiteSpace: 'nowrap', color: 'rgba(44,46,44)', fontWeight: '550', fontFamily: 'Arial' }} > Forgotten your password?
            </Link>
          </div>
          <div style={buttonContainerStyle}>
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
      </Col>
    </Row>
  );
};

export default Login;



