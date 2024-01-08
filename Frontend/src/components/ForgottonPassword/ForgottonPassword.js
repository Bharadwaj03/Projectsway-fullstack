import React, { useState,useEffect } from 'react';
import getCsrfToken from '../CsrfToken/CsrfToken';
import { Link } from 'react-router-dom';
import { Col,Row } from 'react-bootstrap';
import { FaAngleLeft,FaLock } from 'react-icons/fa';
import './ForgottonPassword.css'
import { ToastContainer, toast } from 'react-toastify';
const ForgotPassword = () => {
    console.log('ForgotPassword component rendered');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  console.log(csrfToken)
  // Csrf Token
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };

    fetchCsrfToken();
  }, []);

  // handling password
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      // Email is empty, set the emailError to true
      setMessage("Email required");
      return;
    }
    console.log("ee",email)
    try {
      // Give post request to backend
      const response = await fetch('http://localhost:8000/api/forgot-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ email }),
      });
      console.log(email)
  
      const data = await response.json();
     // Response From backend is ok
      if (response.ok) {
        toast.success('Email sent successfully!', {
          // position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
  <Row  className='justify-content-center'>
    <Col xs={12} sm={8} md={6} lg={4}>
     <div className='forgot-password-container' style={{ width:'480px',backgroundColor:''}}>
      <ToastContainer className="custom-toast" />
        <FaLock  style={{fontSize:'90px',color:'black'}}/>
           <h2 style={{marginTop:'27px',fontWeight:'700',fontSize:'27px',fontFamily:'Arial'}}>Forgot Password</h2>
              <div style={{marginTop:'118px',marginBottom:'70px'}}>
                   <p style={{marginTop:'-110px',color:'rgb(87, 84, 84)',fontWeight:'400'}}>Enter your email and we'll send you a link to reset your password.</p>
                   <input style={{width:'340px',marginLeft:'52px',marginTop:'25px',color:'black',fontSize:'17px'}} className='form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='@emailaddress' />
                  <button className="btn btn-success" style={{marginTop:'30px',width:'210px'}} onClick={handleForgotPassword}>Submit</button>
                 <p className="message" >{message}</p>
               </div>
             <Link to="/login" className='back-to-login'  style={{textDecoration:'none',whiteSpace: 'nowrap'}}>
           <FaAngleLeft style={{fontSize:'38px',marginRight:'149px',marginTop:'18px',color:'grey'}} /> <h1 style={{marginLeft:'30px',fontSize:'20px',marginTop:'-37px',textDecoration:'none',whiteSpace: 'nowrap',color:'grey'}}> Back to Sign in  </h1>
         </Link>
      </div>
    </Col>
  </Row>
  );
};

export default ForgotPassword;
