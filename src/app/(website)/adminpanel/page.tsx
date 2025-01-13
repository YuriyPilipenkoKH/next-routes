
import UsersList from '@/app/components/User/UsersList'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminPage =async () => {
  const session = await getSession()
    if (!session) {
      redirect('/login')
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