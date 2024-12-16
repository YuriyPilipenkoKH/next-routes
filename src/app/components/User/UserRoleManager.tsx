import { UserRoleProps } from '@/models/User'
import React from 'react'

const UserRoleManager: React.FC<UserRoleProps> = ({ user, onRoleChange }) => {

  console.log(user, onRoleChange);
  
  return (
    <div>UserRoleManager</div>
  )
}

export default UserRoleManager