


import React, { useState, useEffect } from 'react';
import './ProjectForm.css';
import getCsrfToken from '../CsrfToken/CsrfToken';
const AddProjectForm = ({ closeModal: closeParentModal, onProjectAdded }) => {
  const [projectName, setProjectName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [slackMembers, setSlackMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  console.log(modalOpen)
  console.log(teamMembers)
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
  const accessToken = localStorage.getItem('accessToken');
  console.log('Access Token from Local Storage:', accessToken);
  

  useEffect(() => {
    const fetchSlackMembers = async () => {
      const slackToken = 'xoxb-1296151058150-6382257415526-zEXIea8anmFg8MSinTrxsmOC';
      try {
        const response = await fetch(`http://localhost:8000/api/get-slack-members/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${slackToken}`,
            'X-CSRFToken': csrfToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSlackMembers(data.members);
        } else {
          console.error('Failed to fetch Slack members:', response.status);
        }
      } catch (error) {
        console.error('Error fetching Slack members:', error);
      }
    };

    fetchSlackMembers();
  }, [csrfToken]);

  const handleAddTeamMember = () => {
    console.log('Selected Team Member:', selectedTeamMember);
    console.log('Team Members:', teamMembers);
    if (selectedTeamMember && !teamMembers.includes(selectedTeamMember)) {
      console.log('Selected Team Member ID:', selectedTeamMember); 
      setTeamMembers([...teamMembers, selectedTeamMember]);
      setSelectedTeamMember('');
    }
  };

  const handleRemoveTeamMember = (member) => {
    const updatedTeamMembers = teamMembers.filter((m) => m !== member);
    setTeamMembers(updatedTeamMembers);
  };

  const closeModalLocal = () => {
    setModalOpen(false);
    closeParentModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = `${now.toLocaleString('en-us', { month: 'short' })} ${now.getDate()} ${now.getHours()}:${now.getMinutes()}${now.getHours() >= 12 ? 'pm' : 'am'}`;
    setCreationDate(formattedDate);

    const newProject = {
      projectName,
      teamMembers,
      creationDate,
    };
    console.log(newProject);
     // Log the access token just before making the request
    console.log('Token before request:', accessToken);

    try {
      const response = await fetch('http://localhost:8000/api/add-project/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        onProjectAdded();
      } else {
        console.error('Failed to add project:', response.status);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className='form-container'>
      {/* <h2 style={{marginTop:'20px',fontSize:'44px',fontWeight:'600',marginBottom:'70px',color:'red',marginRight:'230px'}}>Add Project</h2> */}
      <form onSubmit={handleSubmit}>
        <input type="text" style={{width:'360px',marginRight:'140px',paddingLeft:'20px'}} value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder='Project Name' required />

        <div className='input-container'>
          <select style={{width:'300px',padding:'10px',borderRadius:'5px',backgroundColor:'#f8f8f8',fontSize:'16px',border:'1px solid #ddd'}} value={selectedTeamMember} onChange={(e) => setSelectedTeamMember(e.target.value)}>
            <option value="" >Select Team Member</option>
            {slackMembers.map((member) => (
              <option key={member.id} value={member.id} style={{color:'black',width:'160px',fontWeight:'500',textAlign:'start',lineHeight:'10px',fontFamily:'Arial',fontSize:'18px',marginTop:'80px',paddingLeft:'90px'}}>
                {member.real_name}
              </option>
            ))}
          </select>
          <button type="button" style={{width:'200px',height:'40px'}} onClick={handleAddTeamMember}>
            Add  Member
          </button>
        </div>
        <ul>
          {teamMembers.map((member) => (
            <li key={member}>
              {member} <button type="button" style={{marginTop:'13px'}} onClick={() => handleRemoveTeamMember(member)}>Remove</button>
            </li>
          ))}
        </ul>

        {creationDate && <p>Added on {creationDate}</p>}

        <button type="submit" style={{marginTop:'20px',width:'220px'}}>Add Project</button>
        <span className="close" onClick={closeModalLocal}>&times;</span>
      </form>
    </div>
  );
};

export default AddProjectForm;



