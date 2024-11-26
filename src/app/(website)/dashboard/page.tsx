import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'

import React from 'react'

const DashboardPage = async () => {
  const session = await getSession()
  const user = session?.user
  const userName= user?.name
  const userEmail= user?.email
  if (!session) {
    redirect('/login')
  }
  return (
    <div>
      Logged in as  {userName}
    </div>
  )
}

export default DashboardPage