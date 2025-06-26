"use client"
import React, { useEffect } from 'react'
import axios from 'axios';
import { ClerkProvider, useUser } from '@clerk/nextjs';
import { UserDetailContext } from './context/UserDetailContext';

export type UsersDetails = {
  name: string,
  email: string,
  credits: number;
}

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = React.useState<UsersDetails | null>(null);

  useEffect(() => {
    if (user) fetchOrCreateUser();
  }, [user]);

  const fetchOrCreateUser = async () => {
    const results = await axios.post('/api/Users', {});
    setUserDetails(results.data);
  }

  return (
    <ClerkProvider>
      <UserDetailContext.Provider value={userDetails}>
        {/* No more items-center or justify-center here */}
        <div className="flex min-h-screen flex-col bg-gray-100">
          {children}
        </div>
      </UserDetailContext.Provider>
    </ClerkProvider>
  )
}

export default Provider;
