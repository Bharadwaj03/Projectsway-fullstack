


// import React, { useState, useEffect,useCallback } from 'react';
// import Sidebar from '../SideBar/SideBar';
// import './Feedback.css';
// import getCsrfToken from '../CsrfToken/CsrfToken';
// import FeedBackForm from './FeedBackForm';
// const name = localStorage.getItem('googleUserName');
// const image = localStorage.getItem('googleUserProfileUrl');


// const mapPriorityToText = (priority) => {
//   switch (priority) {
//     case 'P3':
//       return 'Low (P3)';
//     case 'P2':
//       return 'Minor (P2)';
//     case 'P1':
//       return 'Major (P1)';
//     case 'P0':
//       return 'Critical (P0)';
//     default:
//       return 'N/A';
//   }
// };

// const Feedback = () => {
//   const [statusFilter, setStatusFilter] = useState('Open');
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sortBy, setSortBy] = useState('date');
//   const accessToken = localStorage.getItem('accessToken');
// console.log(accessToken)
// const receivedTokenToken=localStorage.getItem('accessToken')
// console.log("googleaccesstoken",receivedTokenToken)
// const [csrfToken, setCsrfToken] = useState('');
//   console.log(csrfToken)
//   // Fetch CSRF token on component mount
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       const token = await getCsrfToken();
//       setCsrfToken(token);
//     };

//     fetchCsrfToken();
//   }, []);



//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleSortChange = (sortByOption) => {
//     setSortBy(sortByOption);
//   };

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/feedbackfetch/?sort=${sortBy}`);
//       const data = await response.json();

//       // Ensure data is an array before setting feedbackList
//       if (Array.isArray(data)) {
//         setFeedbackList(data);
//       } else {
//         console.error('Invalid data format:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching feedback:', error);
//     }
//   }, [sortBy]);

//   useEffect(() => {
//     fetchData();
//   }, [statusFilter, sortBy, fetchData]);

//   const handleStatusChange = (status) => {
//     console.log('Selected status:', status);
//     setStatusFilter(status);
//   };

//   useEffect(() => {
//     const handleFeedbackAdded = () => {
//       // Fetch the latest feedback after a new one is added
//       fetchData();
//     };

//     window.addEventListener('feedbackadded', handleFeedbackAdded);

//     return () => {
//       window.removeEventListener('feedbackadded', handleFeedbackAdded);
//     };
//   }, [fetchData]);

//   const formatDate = (date) => {
//     const options = { month: 'long', day: 'numeric', year: 'numeric' };
//     return new Date(date).toLocaleDateString(undefined, options);
//   };

//   const calculateDaysAgo = (date) => {
//     const currentDate = new Date();
//     const createdDate = new Date(date);
//     const timeDifference = currentDate - createdDate;
//     const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     return daysDifference;
//   };

  
  
  


//   return (
//     <div className="feedback-container">
//       <Sidebar />
//       <button
//         className="btn btn-primary" onClick={openModal}
//         style={{ color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', margin: '10px 0', position: 'absolute', left: '1220px', top: '110px', backgroundColor: '' }}
//       >
//         New feedback
//       </button>
//       <div style={{ display: '', alignItems: 'center', marginLeft: '1150px', marginTop: '-23px', backgroundColor: '', width: '330px', position: 'absolute', top: '80px' }}>
//         <div style={{ marginRight: '10px', fontWeight: '500', fontSize: '16px', color: 'black', textAlign: 'start', fontFamily: 'Arial' }}>{name}</div>
//         <h1 style={{ fontSize: '15px', color: 'lightgrey', fontWeight: '500', marginTop: '0px', marginRight: '100px', textAlign: 'start' }}>Techjays</h1>
//         <img src={image} alt="Google User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginTop: '-90px', marginLeft: '70px' }} />
//       </div>
//       <div className='info'>
//         <h1
//           style={{
//             fontSize: '20px',
//             marginLeft: '20px',
//             fontWeight: '600',
//             color: 'black',
//             cursor: 'pointer',
//             position: 'relative',
//           }}
//           onClick={() => handleStatusChange('Open')}
//         >
//           Open
//           <div
//             style={{
//               borderBottom: statusFilter === 'Open' ? '2px solid #007bff' : 'none',
//               position: 'absolute',
//               width: '290%',
//               bottom: '-36px',
//               left: '-39%'
//             }}
//           ></div>
//         </h1>
//         <h1
//           style={{
//             fontSize: '20px',
//             marginLeft: '200px',
//             fontWeight: '600',
//             color: 'black',
//             cursor: 'pointer',
//             position: 'relative',
//             whiteSpace: 'nowrap'
//           }}
//           onClick={() => handleStatusChange('In Progress')}
//         >
//           In progress
//           <div
//             style={{
//               borderBottom: statusFilter === 'In Progress' ? '2px solid #007bff' : 'none',
//               position: 'absolute',
//               width: '150%',
//               bottom: '-36px',
//               left: '-20%'
//             }}
//           ></div>
//         </h1>
//         <h1
//           style={{
//             fontSize: '20px',
//             marginLeft: '150px',
//             fontWeight: '600',
//             color: 'black',
//             cursor: 'pointer',
//             position: 'relative',
//             whiteSpace: 'nowrap'
//           }}
//           onClick={() => handleStatusChange('Ready for review')}
//         >
//           Ready for review
//           <div
//             style={{
//               borderBottom: statusFilter === 'Ready for review' ? '2px solid #007bff' : 'none',
//               position: 'absolute',
//               width: '140%',
//               bottom: '-36px',
//               marginRight: '60px',
//               left: '-20%'
//             }}
//           ></div>
//         </h1>
//         <h1
//           style={{
//             fontSize: '20px',
//             marginLeft: '200px',
//             fontWeight: '600',
//             color: 'black',
//             cursor: 'pointer',
//             position: 'relative',
//           }}
//           onClick={() => handleStatusChange('Closed')}
//         >
//           Closed
//           <div
//             style={{
//               borderBottom: statusFilter === 'Closed' ? '2px solid #007bff' : 'none',
//               position: 'absolute',
//               width: '170%',
//               bottom: '-36px',
//               left: '-20%'
//             }}
//           ></div>
//         </h1>
//       </div>
//       <select
//         id="sortSelect"
//         value={sortBy}
//         onChange={(e) => handleSortChange(e.target.value)}
//         style={{ fontSize: '16px', marginLeft: '10px', padding: '5px' }}
//       >
//         <option value="date">Sort by Age (Ascending)</option>
//       </select>
//       <div className='feedback-details'>
 
     





//         <hr style={{ width: '1020px', height: '23px', color: 'grey', marginTop: '-566px', fontWeight: '600', marginRight: '130px' }}></hr>
//         {feedbackList.map((feedback,index) => (
//           <div key={feedback._id} className='feedback-item' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>








//             <div style={{ backgroundColor: 'gold', width: '130px', borderRadius: '10px', textAlign: 'center', marginTop: '150px', height: '50px' }}>
//               <img src={image} alt="Google User" style={{ width: '70px', height: '70px', borderRadius: '50%', marginTop: '-170px', marginLeft: '-55px' }} />
//               <h1 style={{ marginLeft: '100px', fontSize: '15px', whiteSpace: 'nowrap', marginTop: '-100px', color: 'black', fontWeight: '600' }}>{name}</h1>
//               <p style={{ marginTop: '75px', height: '30px', color: 'black', fontWeight: '600' }}>{mapPriorityToText(feedback.priority)}</p>
//             </div>

//             <h1 style={{ fontSize: '17px', marginTop: '30px', color: 'black', fontWeight: '600', fontFamily: 'Arial ' }}>Date opened(Age)</h1>
//             <p style={{ fontWeight: '500', color: 'black', marginTop: '5px' }}> {formatDate(feedback.date)} ({calculateDaysAgo(feedback.date)} days old)</p>
//             <h1 style={{ fontSize: '17px', marginTop: '5px', color: 'black', fontWeight: '600' }}>Location</h1>
//             <p style={{ fontWeight: '500', color: 'black', marginTop: '5px' }}> {feedback.location}</p>
//             <h2 style={{ fontSize: '17px', marginTop: '5px', color: 'black', fontWeight: '600' }}>Description of the feedback</h2>
//             <p style={{ fontWeight: '500', color: 'black', marginTop: '5px' }}>{feedback.description}</p>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className='modal-overlay'>
//           <FeedBackForm
//             closeModal={closeModal}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feedback;




import React, { useState, useEffect,useCallback } from 'react';
import Sidebar from '../SideBar/SideBar';
import './Feedback.css';
import getCsrfToken from '../CsrfToken/CsrfToken';
import FeedBackForm from './FeedBackForm';
const name = localStorage.getItem('googleUserName');
const image = localStorage.getItem('googleUserProfileUrl');


const mapPriorityToText = (priority) => {
  switch (priority) {
    case 'P3':
      return 'Low (P3)';
    case 'P2':
      return 'Minor (P2)';
    case 'P1':
      return 'Major (P1)';
    case 'P0':
      return 'Critical (P0)';
    default:
      return 'N/A';
  }
};

const Feedback = () => {
  const [statusFilter, setStatusFilter] = useState('Open');
  const [feedbackList, setFeedbackList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('date');
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



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSortChange = (sortByOption) => {
    setSortBy(sortByOption);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/feedbackfetch/?sort=${sortBy}`);
      const data = await response.json();

      // Ensure data is an array before setting feedbackList
      if (Array.isArray(data)) {
        setFeedbackList(data);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  }, [sortBy]);

  useEffect(() => {
    fetchData();
  }, [statusFilter, sortBy, fetchData]);

  const handleStatusChange = (status) => {
    console.log('Selected status:', status);
    setStatusFilter(status);
  };

  // const handleFeedbackDelete = async (mongodbId) => {
  //   try {
  //     if (!mongodbId) {
  //       console.error('Invalid MongoDB ID',mongodbId);
  //       return;
  //     }

  //     const response = await fetch(`http://localhost:8000/api/feedback/${mongodbId}/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken': csrfToken,
  //         'Authorization': `Bearer ${accessToken}`,
  //       },
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log(data.message);
  //       fetchData();
  //     } else {
  //       console.error('Error deleting feedback:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting feedback:', error);
  //   }
  // };


  useEffect(() => {
    const handleFeedbackAdded = () => {
      // Fetch the latest feedback after a new one is added
      fetchData();
    };

    window.addEventListener('feedbackadded', handleFeedbackAdded);

    return () => {
      window.removeEventListener('feedbackadded', handleFeedbackAdded);
    };
  }, [fetchData]);

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateDaysAgo = (date) => {
    const currentDate = new Date();
    const createdDate = new Date(date);
    const timeDifference = currentDate - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  
  
  


  return (
    <div className="feedback-container">
      <Sidebar />
      <button
        className="btn btn-primary" onClick={openModal}
        style={{ color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', margin: '10px 0', position: 'absolute', left: '1220px', top: '110px', backgroundColor: '' }}
      >
        New feedback
      </button>
      <div style={{ display: '', alignItems: 'center', marginLeft: '1150px', marginTop: '-23px', backgroundColor: '', width: '330px', position: 'absolute', top: '80px' }}>
        <div style={{ marginRight: '10px', fontWeight: '500', fontSize: '16px', color: 'black', textAlign: 'start', fontFamily: 'Arial' }}>{name}</div>
        <h1 style={{ fontSize: '15px', color: 'lightgrey', fontWeight: '500', marginTop: '0px', marginRight: '100px', textAlign: 'start' }}>Techjays</h1>
        <img src={image} alt="Google User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginTop: '-90px', marginLeft: '70px' }} />
      </div>
    
      <div className='info'>
        <h1
          style={{
            fontSize: '20px',
            marginLeft: '20px',
            fontWeight: '600',
            color: 'black',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => handleStatusChange('Open')}
        >
          Open
          <div
            style={{
              borderBottom: statusFilter === 'Open' ? '2px solid #007bff' : 'none',
              position: 'absolute',
              width: '290%',
              bottom: '-36px',
              left: '-39%'
            }}
          ></div>
        </h1>
        <h1
          style={{
            fontSize: '20px',
            marginLeft: '200px',
            fontWeight: '600',
            color: 'black',
            cursor: 'pointer',
            position: 'relative',
            whiteSpace: 'nowrap'
          }}
          onClick={() => handleStatusChange('In Progress')}
        >
          In progress
          <div
            style={{
              borderBottom: statusFilter === 'In Progress' ? '2px solid #007bff' : 'none',
              position: 'absolute',
              width: '150%',
              bottom: '-36px',
              left: '-20%'
            }}
          ></div>
        </h1>
        <h1
          style={{
            fontSize: '20px',
            marginLeft: '150px',
            fontWeight: '600',
            color: 'black',
            cursor: 'pointer',
            position: 'relative',
            whiteSpace: 'nowrap'
          }}
          onClick={() => handleStatusChange('Ready for review')}
        >
          Ready for review
          <div
            style={{
              borderBottom: statusFilter === 'Ready for review' ? '2px solid #007bff' : 'none',
              position: 'absolute',
              width: '140%',
              bottom: '-36px',
              marginRight: '60px',
              left: '-20%'
            }}
          ></div>
        </h1>
        <h1
          style={{
            fontSize: '20px',
            marginLeft: '200px',
            fontWeight: '600',
            color: 'black',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => handleStatusChange('Closed')}
        >
          Closed
          <div
            style={{
              borderBottom: statusFilter === 'Closed' ? '2px solid #007bff' : 'none',
              position: 'absolute',
              width: '170%',
              bottom: '-36px',
              left: '-20%'
            }}
          ></div>
        </h1>
      </div>
      <select
        id="sortSelect"
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        style={{ fontSize: '16px', marginLeft: '10px', padding: '5px' }}
      >
        <option value="date">Sort by Age (Ascending)</option>
      </select>
      <div className='feedback-details'>
 
     





        <hr style={{ width: '1020px', height: '23px', color: 'grey', marginTop: '-566px', fontWeight: '600', marginRight: '130px' }}></hr>
        {feedbackList.map((feedback,index) => (
          <div key={feedback._id} className='feedback-item' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
           {console.log('Feedback _id:', feedback._id)}
{/* <button onClick={() => handleFeedbackDelete(feedback._id)}>Delete</button> */}






            <div style={{ backgroundColor: 'gold', width: '130px', borderRadius: '10px', textAlign: 'center', marginTop: '150px', height: '50px' }}>
              <img src={image} alt="Google User" style={{ width: '70px', height: '70px', borderRadius: '50%', marginTop: '-170px', marginLeft: '-55px' }} />
              <h1 style={{ marginLeft: '100px', fontSize: '15px', whiteSpace: 'nowrap', marginTop: '-100px', color: 'black', fontWeight: '600' }}>{name}</h1>
              <p style={{ marginTop: '75px', height: '30px', color: 'black', fontWeight: '600' }}>{mapPriorityToText(feedback.priority)}</p>
            </div>

            <h1 style={{ fontSize: '17px', marginTop: '30px', color: 'black', fontWeight: '600', fontFamily: 'Arial ' }}>Date opened(Age)</h1>
            <p style={{ fontWeight: '500', color: 'black', marginTop: '5px' }}> {formatDate(feedback.date)} ({calculateDaysAgo(feedback.date)} days old)</p>
            <h1 style={{ fontSize: '17px', marginTop: '5px', color: 'black', fontWeight: '600' }}>Location</h1>
            <p style={{ fontWeight: '500', color: 'black', marginTop: '5px' }}> {feedback.location}</p>
            <h2 style={{ fontSize: '17px', marginTop: '5px', color: 'black', fontWeight: '600' }}>Description of the feedback</h2>
            <p style={{ fontWeight: '500', color: 'black', marginTop: '5px' }}>{feedback.description}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='modal-overlay'>
          <FeedBackForm
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Feedback;

