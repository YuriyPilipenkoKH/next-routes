'use client'
import { UserRoleProps } from '@/models/User'
import React, { useState } from 'react'

const UserRoleManager: React.FC<UserRoleProps> = ({ user, onRoleChange }) => {

  console.log(user, onRoleChange);
  const [selectedRole, setSelectedRole] = useState(user.role);

  
  return (
    <div>UserRoleManager</div>
  )
}

export default UserRoleManager