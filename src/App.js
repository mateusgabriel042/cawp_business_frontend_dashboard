import React, {useState, useEffect} from "react";
import { ReactACLProvider } from "react-access-level";
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { showNotify, verifyError } from './services/actionsAppService.jsx';

const App = () => {
  
  function getInitialUser() {
    return false;
  }

  function getInitialRoles() {
    let dataUser = JSON.parse(localStorage.getItem('dataUser'));
    
    let permissionsEnd = [];

    if(dataUser != null){
      let permissionsTemp = [];

      if(dataUser?.role.length > 0)
        permissionsTemp = [...dataUser?.role[0]?.permissions];
      
      if(dataUser.permissions.length > 0)
        permissionsTemp = [...permissionsTemp, ...dataUser.permissions];

      

      permissionsTemp.forEach(function(item){
        let endPoint = item.name.substr(0, item.name.lastIndexOf('-'));
        let permission = item.name;
        permissionsEnd.push(`${endPoint}:${permission}`); 
      });
    }
    
    return permissionsEnd;
  }


  return (
    
    <ReactACLProvider extractInitialUser={getInitialUser} extractInitialRoles={getInitialRoles}>
      <Routes />
    </ReactACLProvider>

  );
}


export default App;
