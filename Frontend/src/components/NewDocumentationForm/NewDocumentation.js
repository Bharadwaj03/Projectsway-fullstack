



import React, { useState,useEffect } from 'react';
import './NewDocumentationForm.css';
import { toast } from 'react-toastify';
import getCsrfToken from '../CsrfToken/CsrfToken';
import {  FaPaperclip } from 'react-icons/fa';
const NewDocumentationForm = ({ updateTable,closeModal: closeParentModal }) => {
const [modalOpen, setModalOpen] = useState(false);
const [fileInput, setFileInput] = useState(null); 
const accessToken = localStorage.getItem('accessToken');
console.log(accessToken)
const receivedTokenToken=localStorage.getItem('accessToken')
console.log("googleaccesstoken",receivedTokenToken)
const [csrfToken, setCsrfToken] = useState('');
  console.log(csrfToken)
  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };

    fetchCsrfToken();
  }, []);
console.log(modalOpen)
  const [formData, setFormData] = useState({
    description: '',
    templateLink: '',
    attachment: null,
  });
  const closeModalLocal = () => {
    console.log('leo')
    setModalOpen(false);
    closeParentModal(); // Call the provided closeModal function
  };



  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const openFileInput = () => {
    // Create the file input dynamically
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.style.display = 'none';
    input.addEventListener('change', handleFileChange);

    // Append the input to the body
    document.body.appendChild(input);

    // Trigger the input click
    input.click();

    // Save the input to state
    setFileInput(input);
  };

  const handleFileChange = (e) => {
    try {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        attachment: file,
      }));
  
      // Remove the file input from the body
      if (fileInput && fileInput.parentNode) {
        fileInput.parentNode.removeChild(fileInput);
      } else {
        console.error('Error removing file input: Element or parent node not found');
      }
    } catch (error) {
      console.error('Error handling file change:', error);
    }
  };
  


  const submitForm = async () => {
    console.log('Token before request:', accessToken);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('description', formData.description);
      formDataToSend.append('templateLink', formData.templateLink);
      formDataToSend.append('attachment', formData.attachment);
      console.log(formDataToSend)

      // Send the form data to Django backend using fetch
      const response = await fetch('http://localhost:8000/api/documentation/', {
        method: 'POST',
        headers: {
   
          'X-CSRFToken': csrfToken,
          Authorization: `Bearer ${receivedTokenToken}`,
         
      
      
      
        },
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success('Document added successfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        const responseData = await response.json();

        // Update the table with the new data
        updateTable(responseData);

        
        setFormData({
          description: '',
          templateLink: '',
          attachment: null,
        });
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 style={{color:'black',fontFamily:'Arial',marginRight:'269px',marginTop:'20px',fontWeight:'600',fontSize:'23px'}}>New Documentation </h2>

      <div className="form-group">
        <label htmlFor="description" style={{color:'black',fontWeight:'600',fontSize:'17px',fontFamily:'Arial'}}>Description</label>
        <input type="text" id="description" name="description" placeholder='Type here' style={{verticalAlign:'text-top',paddingBottom:'50px',borderColor: formData.description ? '#007bff' : '',}} value={formData.description} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="templateLink"  style={{color:'black',fontWeight:'600',fontSize:'17px',marginBottom:'10px',whiteSpace:'nowrap'}}>Template Link</label>
        <input type="text" id="templateLink" name="templateLink" placeholder='Add link' style={{borderColor: formData.templateLink ? '#007bff' : ''}} value={formData.templateLink} onChange={handleInputChange} />
      </div>

      <div className="form-group" style={{ cursor: 'pointer' }} onClick={openFileInput}>
        <label
          htmlFor="attachment"
          style={{ color: 'black', fontWeight: '600', fontSize: '17px', marginBottom: '0px', display: 'flex', alignItems: 'center' }}
        >
          Attachments

        </label>
        <div style={{ marginTop: '17px', fontSize: '17px', color: '#007bff', cursor: 'pointer',marginRight:'260px'}}>AddFiles</div>
        <FaPaperclip style={{  color: '#007bff', fontSize: '23px',position:'absolute',right:'530px',top:'438px'  }}/>
      </div>
      <div className="form-buttons">
        <button className="btn btn-primary" type="button" style={{ width: '250px' }} onClick={submitForm}>
          Submit
        </button>
      </div>
       
    
      
      <span className="closes" onClick={closeModalLocal}>&times;</span>
    </div>
  );
};

export default NewDocumentationForm;
