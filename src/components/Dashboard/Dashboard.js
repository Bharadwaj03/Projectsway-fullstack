import React, { useState } from 'react';
import AddProjectForm from '../ProjectForm/ProjectForm';
import './Dashboard.css'
import ProjectList from '../ProjectList/ProjectList';
import techjaysLogo from './sparrow.png';
const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const name=localStorage.getItem('googleUserName')
  console.log("name",name)
  const image =localStorage.getItem('googleUserProfileUrl')
  console.log(image)
  const accessToken = localStorage.getItem('accessToken');
  console.log('token',accessToken)
  const receivedTokenToken=localStorage.getItem('accessToken')
  console.log("googleaccesstoken",receivedTokenToken)

 
 


  const closeModal = () => {
    setIsModalOpen(false);
   
  };
  
 

  return (
    <div className="dashboard">
      <div className="sidebar-logos">
        <img className='techjayss' src={techjaysLogo} alt="Techjays Logo" />
      </div>

   {/* <button className='professional-button' onClick={openModal} >Add Project</button> */}
       
   <div style={{ display: '', alignItems: 'center', marginLeft: '1165px', marginTop: '-53px', backgroundColor: '', width: '330px' }}>
  <div style={{ marginRight: '10px', fontWeight: '500', fontSize: '16px', color: 'black',textAlign:'start',fontFamily:'Arial' }}>{name}</div>
  <h1 style={{ fontSize: '15px', color: 'lightgrey', fontWeight: '500',marginTop:'0px' ,marginRight:'100px',textAlign:'start'}}>Techjays</h1>
  <img src={image} alt="Google User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginTop: '-90px', marginLeft: '70px' }} />
</div>

       <ProjectList/>
        {isModalOpen && (
          <div className='modal-overlay'>
            <AddProjectForm
              closeModal={closeModal}
              
              
            />
          </div>
        )}
      
    </div>
  );
};

export default Dashboard;

