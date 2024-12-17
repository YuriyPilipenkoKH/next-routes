import UserRoleManager from '@/app/components/User/UserRoleManager'
import UsersList from '@/app/components/User/UsersList'
import { getSession } from '@/lib/getSession'
import React from 'react'

const AdminPage =async () => {
  const session = await getSession()
  const user = session?.user
  const change =() => {
    
  }
  return (
    <div>
      <h2>Admin page</h2>
      <UsersList/>
      {/* <UserRoleManager 
      user={user} 
      onRoleChange ={change}
       /> */}
    </div>
  )
}

export default AdminPage