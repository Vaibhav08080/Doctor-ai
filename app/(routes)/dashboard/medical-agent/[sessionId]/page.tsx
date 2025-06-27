import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';

function MedicalAgent() {
    const sessionId = useParams();
    useEffect(() => {
      sessionId && GetsessionDetails();
    }, [sessionId]); 
    const GetsessionDetails = async () => {
      const result = await axios.get(`/api/Users?sessionId=${sessionId}`);
      console.log(result.data);
    }
  return (
    <div>
      <h2>MedicalAgent</h2>
    </div>
  )
}

export default MedicalAgent