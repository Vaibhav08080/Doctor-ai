"use client"
import React, { useEffect } from 'react'
import axios from 'axios';
import { ClerkProvider, useUser } from '@clerk/nextjs';
import { UserDetailContext } from './context/UserDetailContext';
export type UsersDetails ={
    name: string,
    email: string,
    credits: number;
}

function Provider({ children }: { children: React.ReactNode }) {

    const {user}=useUser();
    const [userDetails, setUserDetails] = React.useState<UsersDetails | null>(null);    

    useEffect(() => {
        user&&CreateNewUsers();
    }, [user]);

    const CreateNewUsers =async () => {
        const results = await axios.post('/api/Users', {});
        return results.data;
        setUserDetails(results.data);
      }
  return (
    <div>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <UserDetailContext.Provider value={userDetails}>
                {children}
            </UserDetailContext.Provider>
        </div>
    </div>
  )
}
export default Provider