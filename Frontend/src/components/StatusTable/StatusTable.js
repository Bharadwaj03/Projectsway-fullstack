

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StatusTable.css';
import Sidebar from '../SideBar/SideBar';
import { FaEllipsisV, FaTrashAlt, FaChevronDown, FaShare } from 'react-icons/fa';

const StatusTable = () => {
  const [showOptions, setShowOptions] = useState(null);
  const [taskData, setTaskData] = useState(null);
  console.log(taskData)
  const [phaseSprintData, setPhaseSprintData] = useState(null); // New state for phase and sprint data
  console.log("phase",phaseSprintData)
  const name = localStorage.getItem('googleUserName');
  console.log("name", name);
  const image = localStorage.getItem('googleUserProfileUrl');
  const { listUrl} = useParams(); // Get the listUrl parameter from the URL
  console.log('List URL from params:', listUrl); 
  console.log('List URL:', listUrl); // Add this console log
  const projectName = localStorage.getItem('projectName');
  console.log('p',projectName)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:8000/api/get_tasks_from_list_url/${listUrl}`);
     
      if (!response.ok) {
        console.error('Error fetching tasks:', response.statusText);
        return;
      }

      const tasks = await response.json();
      setTaskData(tasks);
    };

    fetchTasks();
  }, [listUrl]);

  useEffect(() => {
    const fetchPhaseSprintData = async () => {
      // Replace 'some_space_url' with the actual space URL
      const encodedSpaceUrl = encodeURIComponent('https://app.clickup.com/9016104096/v/li/901600834824');
      const response = await fetch(`http://localhost:8000/api/get_phase_sprint_names/${encodedSpaceUrl}`);

      if (!response.ok) {
        console.error('Error fetching phase and sprint data:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Received Data:', data); 
      setPhaseSprintData(data);
    };

    fetchPhaseSprintData();
  }, []);
  const handleShareDocument = () => {
    console.log('Share Document clicked');
    setShowOptions(null);
    // Add logic for sharing document
  };

  const handleDeleteDocument = () => {
    console.log('Delete Document clicked');
    setShowOptions(null);
    // Add logic for deleting document
  };

  const addNewRow = () => {
    // Add logic to handle the addition of a new row
    console.log('+Add clicked');
  };
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'normal':
        return 'rgba(242, 204, 177)';
      case 'high':
        return 'rgba(224, 153, 179)';
      case 'low':
        return 'lightblue';
      case 'urgent':
        return 'rgba(230, 73, 94)';
      default:
        return 'grey'; // Set the default background color
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'no fix needed':
        return 'rgba(150, 155, 217)'; // Set the background color for 'needed'
      case 'in progress':
        return 'black'; // Set the background color for 'in progress'

      case 'to do':
        return 'rgba(200, 200, 204)'
      
      default:
        return 'grey'; // Set the default background color
    }
  };

 

  return (
    <div className="App">
      <div className="container-fluid">
        <div id='eee' className="row">
          <Sidebar />
          <button id='btn1'
            className="btn btn-primary"
            style={{ color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', margin: '10px 0', position: 'absolute', left: '1220px', top: '150px', backgroundColor: '' }}
          >
            New milestone
          </button>
          <button id='btn2'
            className="btn btn-primary"
            style={{ color: '#007bff', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', margin: '10px 0', position: 'absolute', left: '1050px', top: '150px', border: '1px solid #007bff ', backgroundColor: 'white' }}
          >
            Hide complete
          </button>
          <div id='userd' className='userdetails' style={{ display: '', alignItems: 'center', marginLeft: '1150px', marginTop: '-23px', backgroundColor: '', width: '330px', position: 'absolute', top: '80px' }}>
            <div style={{ marginRight: '10px', fontWeight: '500', fontSize: '16px', color: 'black', textAlign: 'start', fontFamily: 'Arial' }}>{name}</div>
            <h1 style={{ fontSize: '15px', color: 'lightgrey', fontWeight: '500', marginTop: '0px', marginRight: '100px', textAlign: 'start' }}>Techjays</h1>
            <img src={image} alt="Google User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginTop: '-90px', marginLeft: '70px' }} />
          </div>
          <div style={{
            position: 'absolute',
            top: '200px',
            left: '340px',
            textAlign: 'start',
            width: '100%',
          }}>
            <FaChevronDown className='chevron' />
           
            {phaseSprintData && (
  <div style={{ textAlign: 'left', marginTop: '10px' }}>
    <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px',color:'black' }}>
      {phaseSprintData.phase_name} - {phaseSprintData.sprint_name}
    </p>
  </div>
)}

          </div>

          <main role="main" className="col-md-9 col-lg-10 px-0">
            <div id='tablestatus' className="table-container table-responsive">
              <table id='tabless' className="table table-striped custom-table" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                  <tr id='r3'>
                    <th id='t1' className="col-md-4 sm-2" style={{ width: '1660px', fontSize: '16px', paddingLeft: '33px' }}>Name</th>
                    <th id='t3' className="col-md-2" style={{ width: '690px', paddingLeft: '49px', fontSize: '16px' }}>Priority</th>
                    <th id='t4' className="col-md-2" style={{ width: '690px', paddingLeft: '49px', fontSize: '16px' }}>Status</th>
                    <th id='t5' className="col-md-2" style={{ width: '690px', paddingLeft: '29px', fontSize: '16px' }}>Est.Deliv Date</th>
                  </tr>
                </thead>
                <tbody>
  {taskData && taskData.length > 0 ? (
    taskData.map(task => (
      <tr key={task.id}>
        <td style={{ color: 'rgba(000)', fontWeight: '500', fontFamily: 'Arial', fontSize: '17px', width: '2900px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className="three-dots-menu"
              style={{ marginRight: '19px', cursor: 'pointer', color: 'gray', paddingLeft: '11px' }}
            >
              <FaEllipsisV />
            </div>
            {/* Assuming task.Attachments is an object with a 'status' property */}
            {task.name}
          </div>
          {/* Assuming showOptions is a state variable */}
          {showOptions && (
            <div className="options-box">
              <div onClick={handleShareDocument}>
                <FaShare /> Share Document
              </div>
              <div onClick={handleDeleteDocument} style={{ color: 'red' }}>
                <FaTrashAlt /> Delete
              </div>
            </div>
          )}
        </td>
        <td
  style={{
    
    color: 'black',
    fontWeight:'500',
    borderRadius: '20px',
    padding: '0px 6px',
    marginTop: '38px',
    textAlign: 'center', // Center text horizontally
    verticalAlign:'middle',
  }}
>
  <span
    style={{
     
      width:'140px',
      backgroundColor: getPriorityColor(task.priority && task.priority.priority),
      padding: '7px 6px', // Adjust padding to control the background color's appearance
      borderRadius: '20px',
      lineHeight: '1.5', // Center text vertically within the span
      textTransform: 'capitalize',
      display: 'inline-block',
    }}
  >
    {task.priority && task.priority.priority ? task.priority.priority : 'N/A'}
  </span>
</td>
<td
  style={{
    fontWeight:'500',
    fontFamily:'Arial san serif',
    color: 'black',
    borderRadius: '20px',
    padding: '0px 6px',
    marginTop: '38px',
    verticalAlign:'middle',
    marginLeft:'130px',
    textAlign: 'center',
  }}
>
  <span
    style={{
      fontFamily:'Arial',
      width:'140px',
      backgroundColor: getStatusColor(task.status && task.status.status),
      padding: '7px 6px', // Adjust padding to control the background color's appearance
      borderRadius: '20px',
      display:'inline-block',
      lineHeight:'1.5',
      marginTop:'0px',
      textTransform:'capitalize'
    }}
  >
    {task.status && task.status.status ? task.status.status : 'N/A'}
  </span>
</td>

      

      
        <td>
  {task.due_date ? formatDate(new Date(parseInt(task.due_date))) : 'N/A'}
</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" style={{ textAlign: 'center', height: '10px', padding: '20px', paddingTop: '29px' }}>
        <h1 onClick={addNewRow} style={{ color: 'black', fontSize: '15px', cursor: 'pointer', marginRight: '950px', marginBottom: '15px' }}>
          +Add
        </h1>
      </td>
    </tr>
  )}
</tbody>

              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StatusTable;





