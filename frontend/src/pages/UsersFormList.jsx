import React, { useState, useEffect  } from 'react';
import {postBody, getList} from '../services/api';
import  '../Styles/UserFormList.css';
import DropListUsers from '../components/DropdpwmUsers';

const UserFormList = ()  => {

    const [userId, setId] =  useState('');
    const [userName, setName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userRole, setRole] = useState('');
    const [userList, setListUsers] = useState([]); 

    const addUser = async () => {
      if (!userName.trim())     
        {
          alert('Please fill user name');
          return;
        }
        else if (!userEmail.trim())
        {
            alert('Please fill Email');
            return;
        }
        else if (userPassword <= 0)
        {
            alert('Please fill Password');
            return;
        }
        else if(!userRole.trim())
        {
            alert('Please fill Role');
            return;
        }

        const dt =  
        {
            "name":userName,
            "email":userEmail,
            "password":userPassword,
            "role":userRole
        }

        try {

            var response;

            if(!userId)
                {
                  response = await postBody('http://localhost:7000/api/users/', dt, 'POST'); 
                  alert('User added')
                }
                else
                {
                  response = await postBody('http://localhost:7000/api/users/'+userId, dt, 'PUT'); 
                  alert('User updated')
                }

                // setListUsers((users) => [
                //     ...users,
                //     { ...dt },
                //   ]);
        } 
        catch (error) 
        {
            console.log(error)
            alert(error)
        }

        setName('');
        setEmail('');
        setPassword('');
        setRole('');
    }
  

        return(
            <div className="users-manager">

            {/* <div className="users-list">
                {propertiesRegistred.length === 0 ? (
                <p>No tasks registered yet.</p>
                ) : (          
                    propertiesRegistred.map((property, index) => (                  
                      <PropertyCard property={property} propSelected={devSelectHandler} />
                   
                ))       
                )}
            </div> */}
      
            <div className="users-form">
              <h2>Register a User</h2>
              <form>      
                <div>
                  <label>User name:</label>
                  <input
                    type="text"               
                    placeholder="Enter user name"
                    id='userName'
                    value={userName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

              <div>
                  <label>Select a type of user:</label>
                  <DropListUsers value={userRole} devSelectHandler={setRole} /> 
              </div>
   
                <div>
                  <label>User email:</label>
                  <input
                    type="text"               
                    placeholder="Enter owner name"
                    id ='userEmail'
                    value={userEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
     
                <div>
                  <label>Type the password:</label>
                  <input
                    type="password"               
                    placeholder="Enter password"
                    id ='userPassword'
                    value={userPassword}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>            
    
                <div className="button-container">
                <button type="submit" >Add User</button>
                <button className="delete-btn">Delete User</button> 
                </div>             
              </form>
            </div>
          </div>
        )
}

export default UserFormList;