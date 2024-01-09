



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StatusTable.css';
import Sidebar from '../SideBar/SideBar';
import { FaEllipsisV, FaTrashAlt,  FaShare } from 'react-icons/fa';

const StatusTable = () => {
  const [showOptions, setShowOptions] = useState(null);
  const [taskData, setTaskData] = useState(null);
  console.log(taskData)
  const [phaseSprintData, setPhaseSprintData] = useState(null); 
  console.log("phase",phaseSprintData)
  const name = localStorage.getItem('googleUserName');
  console.log("name", name);
  const image = localStorage.getItem('googleUserProfileUrl');
  const { listUrl} = useParams(); 
  console.log('List URL:', listUrl);
  const projectName = localStorage.getItem('projectName');
  console.log('p',projectName)
  const [sprints, setSprints] = useState([]);
  console.log("sprintsname",sprints)
  

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


  const handleSprintChange = async (selectedSprint) => {
    console.log('Dropdown changed. Selected Sprint:', selectedSprint);
  
  
    const folderLink = encodeURIComponent('https://app.clickup.com/9002025943/v/f/90020111801/90020047409');
    const response = await fetch(`http://localhost:8000/api/get_sprints/${folderLink}`);
    
    if (!response.ok) {
      console.error('Error fetching sprints:', response.statusText);
      return;
    }
  
    const sprintNames = await response.json();
    console.log('Fetched sprint names:', sprintNames);
   
    setSprints(sprintNames.sprints);
  
 
    const selectedSprintId = sprintNames.sprints.find(sprint => sprint.name === selectedSprint)?.id;
  
    if (!selectedSprintId) {
      console.error('Selected sprint ID not found.');
      return;
    }
    console.log('Selected sprint ID:', selectedSprintId);
  
    try {
      
      const selectedListUrl = `https://app.clickup.com/9002025943/v/li/${selectedSprintId}`;
      console.log('Constructed List URL:', selectedListUrl);
     
      const tasksResponse = await fetch(`http://localhost:8000/api/get_tasks_from_list_url/${encodeURIComponent(selectedListUrl)}`);
  
      if (!tasksResponse.ok) {
        console.error('Error fetching tasks for the selected sprint:', tasksResponse.statusText);
        return;
      }
  
      const tasks = await tasksResponse.json();
      console.log('Fetched tasks:', tasks);
      setTaskData(tasks);
    } catch (error) {
      console.error('Error handling sprint selection:', error.message);
    }
  };
  


  const handleShareDocument = () => {
    console.log('Share Document clicked');
    setShowOptions(null);
   
  };

  const handleDeleteDocument = () => {
    console.log('Delete Document clicked');
    setShowOptions(null);
   
  };

  const addNewRow = () => {
   
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
        return 'grey'; 
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'no fix needed':
        return 'rgba(150, 155, 217)'; 
      case 'in progress':
        return 'green'; 
      case 'Open':
        return 'lightgrey'

      case 'to do':
        return 'rgba(200, 200, 204)'
      
      default:
        return 'grey'; 
    }
  };

 

  return (
    <div className="App">




 

      <div className="container-fluid">
      <select className='selectdropdown' onClick={() => handleSprintChange()} onChange={(e) => handleSprintChange(e.target.value)}>
  <option value="" disabled selected>Select a Sprint</option>
  {sprints.map(sprint => (
    <option key={sprint.id} value={sprint.name}>{sprint.name}</option>
  ))}
</select>
    
        <div id='eee' className="row">
      
          <Sidebar />
          <button id='btn1'
            className="btn btn-primary" onClick={handleSprintChange}
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
           

          </div>

          <main role="main" className="col-md-9 col-lg-10 px-0">
            <div id='tablestatus' className="table-container table-responsive">
              <table id='tabless' className="table table-striped custom-table" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                  <tr id='r3'>
                    <th id='t1' className="col-md-4 sm-2" style={{ width: '1660px', fontSize: '16px', paddingLeft: '33px' }}>Name</th>
                    <th id='t3' className="col-md-2" style={{ width: '690px', paddingLeft: '73px', fontSize: '16px' }}>Priority</th>
                    <th id='t4' className="col-md-2" style={{ width: '690px', paddingLeft: '83px', fontSize: '16px' }}>Status</th>
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
         
            {task.name}
          </div>
       
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
    textAlign: 'center', 
    verticalAlign:'middle',
  }}
>
  <span
    style={{
     
      width:'140px',
      backgroundColor: getPriorityColor(task.priority && task.priority.priority),
      padding: '7px 6px', 
      borderRadius: '20px',
      lineHeight: '1.5', 
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
      padding: '7px 6px', 
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