




import React, { useState, useEffect,useCallback } from 'react';
import { Link, useLocation,useNavigate  } from 'react-router-dom';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks,  faComment,faTable,faFile,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import techjaysLogo from './sparrow.png';




const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const projectName = localStorage.getItem('projectName');
  const navigate=useNavigate()
  const clickedListId = localStorage.getItem('clickedListId');


  const handleLinkClick = useCallback((path) => {
    setActiveLink(path);
  }, []);


  const handleBackClick = () => {
    
    navigate('/dashboard')
  };

 
  const updateStatusTableLink = useCallback(() => {
    const statusTableUrl = `https://app.clickup.com/${clickedListId}/v/li/${clickedListId}`;
    handleLinkClick(`/statustable/${clickedListId}?listUrl=${encodeURIComponent(statusTableUrl)}`);
  }, [clickedListId, handleLinkClick]);

  useEffect(() => {
   
    updateStatusTableLink();
  }, [updateStatusTableLink]);

 
  useEffect(() => {
    updateStatusTableLink();
  }, [clickedListId, updateStatusTableLink]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
 
  



 
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
      
    <div className="container-fluid">
  <div className="row">
    <div className="col-md-2">
      <div className="sidebar">
        <div className="sidebar-logo">
          <img className="techjays" src={techjaysLogo} alt="Techjays Logo" />
        </div>

        <nav className="sidebar-nav">
        <FontAwesomeIcon icon={faArrowLeft} style={{fontSize:'15px',color:'black',border:'1px solid black',padding:'8px',borderRadius:'30px',position:'absolute',left:'15%',cursor:'pointer'}}   onClick={handleBackClick} />
          <h1  style={{color:'black',fontSize:'24px',fontWeight:'500',fontFamily:'Arial',marginTop:'26px',cursor:'pointor',paddingLeft:'20px'}}>{projectName}</h1>
        
          <ul>
            <li>
              <Link
                to="/dashboard"
                className={`sidebar-link ${activeLink === '/dashboard' ? 'active-link' : ''}`}
                onClick={() => handleLinkClick('/dashbaord')}
              >
                <FontAwesomeIcon className="fonts" icon={faTasks} /> Your Projects
              </Link>
            </li>
            <li>
            <Link
        to={`/statustable/${clickedListId}`}
        className={`sidebar-link ${location.pathname.startsWith('/statustable') ? 'active-link' : ''}`}
        onClick={() => handleLinkClick(`/statustable/${clickedListId}`)}
      >
        <FontAwesomeIcon className="fonts" icon={faTable} /> Status Table
      </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className={`sidebar-link ${activeLink === '/feedback' ? 'active-link' : ''}`}
                onClick={() => handleLinkClick('/feedback')}
              >
                <FontAwesomeIcon className="fonts" icon={faComment} /> Feedbacks
              </Link>
            </li>
            <li>
              <Link
                to="/documentation"
                className={`sidebar-link ${activeLink === '/documentation' ? 'active-link' : ''}`}
                onClick={() => handleLinkClick('/documentation')}
              >
                <FontAwesomeIcon className="fonts" icon={faFile} /> Documentation
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div className="col-md-10">

    </div>
  </div>
</div>

  );
};

export default Sidebar;













