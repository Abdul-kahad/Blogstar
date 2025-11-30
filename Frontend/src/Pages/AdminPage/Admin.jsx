import { useState, useEffect } from 'react'
import UserCard from '../../components/UserCard/UserCard'
import classes from './Admin.module.css'
import axios from 'axios'

 const Admin = () => {
  const [users, setUsers] = useState([])
  const [serverMsg, setServerMsg] = useState('')

  useEffect(() => {
    const getUsers = async () => {
     try {
      const response = await axios.get('http://localhost:3000/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setUsers(response.data)
      setServerMsg(response.data.message)
     } catch (error) {
    console.log(error.response?.message || error.message)
    setServerMsg(error.response?.data?.message || 'Somthing went wrong, cannot get users')
  }
}
  getUsers()
}, [])

  const deleteUserHandler = async (uid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deleteUser/${uid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setServerMsg(response.data.message)
    } catch (error) {
      console.log(error.response?.message || error.message)
      setServerMsg(error.response?.data?.message || 'Somthing went wrong, cannot delete user')
    }
  }
  return(
    <>
     <h1>ADMIN DASHBOARD</h1>
      <div className={classes.AdminDashboard}>
        {serverMsg ?? <p>{serverMsg}</p> }
        {users.map(user => (
          <UserCard 
            key={user._id} 
            username={user.username} 
            uid={user._id} 
            posts={2}
            suspend
            delete={() => deleteUserHandler(user._id)}
            />
        ))}
      </div>
    </>
  );
 }
 export default Admin