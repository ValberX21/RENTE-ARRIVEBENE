import React, { useState, useEffect  } from 'react';
import {postBody, getList} from '../services/api';
import  '../Styles/UserFormList.css';

const LeaseFormList = ()  => {

    const [leaseId, setId] =  useState('');
    const [leaseProperty, setProperty] = useState('');
    const [leaseTenant, setTenant] = useState('');
    const [leaseLandLord, setLandLord] = useState('');
    const [leaseList, setListLease] = useState([]); 

    const addLease = async (e) => {

      e.preventDefault();

      if (!leaseProperty.trim())     
        {
          alert('Please fill user name');
          return;
        }
        else if (!leaseTenant.trim())
        {
            alert('Please fill Email');
            return;
        }       
        else if (!leaseLandLord)
        {  
           

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

                setListUsers((users) => [
                    ...users,
                    { ...dt },
                  ]);
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

    const SelectUser = (user) => {

      setId(user._id)
      setName(user.name);
      setEmail(user.email)
      setRole(user.role)
    };

     const listUserss = async () => {
         try {
           const response = await getList('http://localhost:7000/api/users');
           const users = await response; 
           setListUsers(users); 
         } catch (error) {
           console.error('Error fetching tasks:', error);
           alert('Failed to fetch tasks');
         }
       };

      const deleteUser = async ()  => {

        const dt = {}

        try 
        {
          const response = await postBody('http://localhost:7000/api/users/'+ userId, dt ,'DELETE'); 
          const users = await response; 
          alert('User Deleted')
        } 
        catch (error) 
        {
          alert(error);
        }
      }

        useEffect(() => {
          listUserss();
        }, [listUserss, addUser])

        return(
            <div className="users-manager">

            <div className="users-list">
                {userList.length === 0 ? (
                <p>No tasks registered yet.</p>
                ) : (          
                  userList.map((users, index) => (       
                      <UserCard key={index} users={users} userSelected={SelectUser}/>           
                   
                ))       
                )}
            </div> 
    
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
                <button onClick={addUser}>Add User</button>
                <button onClick={deleteUser} className="delete-btn">Delete User</button> 
                </div>             
              </form>
            </div>
          </div>
        )
}

export default LeaseFormList;