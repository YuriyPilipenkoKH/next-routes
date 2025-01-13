import { getUsers } from '@/actions/get-users'
import React from 'react'

const UsersList = () => {
  const result = getUsers()
  .then(response => {
    if (response.success && response.usersList) {
      // setList(response.data.usersList);
      console.log(response.usersList);
      console.log(result);
      
    }
    })
  
  return (
    <div>UsersList

    </div>
  )
}

export default UsersList