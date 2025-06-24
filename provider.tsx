"use client"
import React, { useEffect } from 'react'
import axios from 'axios';
import { ClerkProvider, useUser } from '@clerk/nextjs';

function Provider({ children }: { children: React.ReactNode }) {

    const {user}=useUser();

    useEffect(() => {
        user&&CreateNewUsers();
    }, [user]);

    const CreateNewUsers =async () => {
        const results = await axios.post('/api/Users', {});
        return results.data;
      }
  return (
    <div>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            {children}
        </div>      
    </div>
  )
}
export default Provider