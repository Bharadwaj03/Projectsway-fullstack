



import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './ProjectList.css';

const ProjectList = () => {
  const [taskIds, setTaskIds] = useState(['85zrqrgrw', '86cu9n4tb']);
  const [taskData, setTaskData] = useState([]);
  console.log("f",taskData)
  const navigate =useNavigate()

  useEffect(() => {
    const fetchDataForTasks = async () => {
      try {
        const dataPromises = taskIds.map(async (taskId) => {
          const response = await fetch(`http://localhost:8000/api/get_task/${taskId}/`);
          if (!response.ok) {
            throw new Error(`Network response was not ok for task ID: ${taskId}`);
          }
          return response.json();
        });

        const responseData = await Promise.all(dataPromises);
        setTaskData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataForTasks();
  }, [taskIds, setTaskIds]);
  const projectListUrls = {
    '9002025943': 'https://app.clickup.com/9002025943/v/li/900200195433',
    '9016104096': 'https://app.clickup.com/9016104096/v/li/901600834824',
    
  };
  
  const extractListIdFromUrl = (url) => {
    const match = url.match(/\/li\/(\d+)/);
    return match ? match[1] : null;
  };
  
  const handleProjectClick = (clickedListId,projectName) => {
    console.log('Clicked List ID:', clickedListId);
    localStorage.setItem('projectName', projectName);
  
    for (const [mappedProjectId, url] of Object.entries(projectListUrls)) {
      const listIdFromUrl = extractListIdFromUrl(url);
      console.log(mappedProjectId)
  
      console.log('Checking:', listIdFromUrl, 'with', clickedListId);
  
      if (clickedListId === listIdFromUrl) {
        console.log('Match found. List URL:', url);
        navigate(`/statustable/${clickedListId}?listUrl=${encodeURIComponent(url)},`);
       
     
      
        return; // Exit the loop once a match is found
      }
    }
  
    // If no match is found
    // console.error('Clicked list ID is not mapped to a list URL');
  };
  
  return (
    <div className='container-fluid'>
      <h2 style={{ marginRight: '800px', fontWeight: '700', fontSize: '39px', marginTop: '39px', marginBottom: '0px', whiteSpace: 'nowrap', textAlign: 'left', paddingLeft: '69px' }}>Your projects</h2>

      <div style={{ display: '', alignItems: '', backgroundColor: '', width: '200px', marginLeft: '1120px', marginTop: '20px' }}>
        <input
          className='form-control input-with-placeholder'
          style={{ width: '250px', backgroundColor: 'white', border: '1px solid white', marginTop: '-65px', marginBottom: '0px', height: '49px', paddingLeft: '44px' }}
          placeholder='  Search Projects'
        />
        <FaSearch style={{ position: 'relative', right: '69px', paddingRight: '0px', top: '-35px', color: 'grey', fontSize: '22px' }} />
      </div>

      {taskData.map((projectArray) => (
        projectArray.map((task) => (
            <div key={task.id} onClick={() => handleProjectClick(task.list && task.list.id,task.project.name)}>
            <Link
              to={`/statustable/${task.project && task.list.id}`}
              className="project-box"
              style={{ textDecoration: 'none' }}
            >
              <h3 style={{ marginRight: '1060px', marginTop: '15px', fontSize: '22px', fontFamily: '', fontWeight: '600', textAlign: 'start', paddingLeft: '15px' }}>{task.project && task.project.name}</h3>
              <p style={{ marginLeft: '950px', marginTop: '-40px', textDecoration: 'none', color: 'grey', fontSize: '18px', fontWeight: '400' }}>Updated On: {new Date(parseInt(task.date_updated)).toLocaleString()}</p>
              <div className="team-members">
                {task.assignees && task.assignees.map((assignee) => (
                  <div key={assignee.id} className="member-container">
                    {assignee.username}
                  </div>
                ))}
              </div>
            </Link>
          </div>
        ))
      ))}
    </div>
  );
};

export default ProjectList;






