'use client'
import { Roles, UserRoleProps } from '@/models/User'
import React, { useState } from 'react'

const UserRoleManager: React.FC<UserRoleProps> = ({ user, onRoleChange }) => {

  // console.log(user, onRoleChange);
  const [selectedRole, setSelectedRole] = useState<Roles>(user.role);

  const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value as Roles; // Type assertion
    setSelectedRole(newRole);
    onRoleChange(user._id, newRole);
  };
  
  return (
    <div>
      <h3>{user.name}</h3>
      <select value={selectedRole} onChange={handleChangeRole}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </select>
    </div>
  )
}

export default UserRoleManager