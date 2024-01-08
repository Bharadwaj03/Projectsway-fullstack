
import './App.css';
import { Routes,Route} from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgottonPassword/ForgottonPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Sidebar from './components/SideBar/SideBar';
import StatusTable from './components/StatusTable/StatusTable';
import Dashboard from './components/Dashboard/Dashboard';
import AddProjectForm from './components/ProjectForm/ProjectForm';
import Documentation from './components/Documentation/Documentation';
import {gapi} from 'gapi-script'
import { useEffect } from 'react';
import Feedback from './components/FeedBack/Feedback';
import NewDocumentationForm from './components/NewDocumentationForm/NewDocumentation';
const clientId='15965859062-oct8ilh407lpgraoljnjjqehj603pb36.apps.googleusercontent.com'
function App() {
  useEffect(()=>{
    function start(){

      gapi.client.init({
        clientId:clientId,
        scope:''


      })
    }
    gapi.load('client:auth2',start)


  }



  )
  return (
    <div className="App">
    <Routes>
      <Route path='documentation' element={<Documentation/>}></Route>
      <Route path='registration' element={<Registration/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
      <Route path='sidebar' element={<Sidebar/>}></Route>
      <Route path="statustable/:listUrl" element={<StatusTable/>}/>
      <Route path='dashboard' element={<Dashboard/>}></Route>
      <Route path='addproject' element={<AddProjectForm/>}></Route>
      <Route path='feedback' element={<Feedback/>}></Route>
      <Route path='newdocument' element={<NewDocumentationForm/>}></Route>
    
      


   
      
     
    </Routes>
           
    </div>

  );
}

export default App;
