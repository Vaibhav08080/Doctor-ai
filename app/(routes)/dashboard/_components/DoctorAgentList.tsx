'use client';
import React from 'react';
import { AIDoctorAgents } from '@/listcontentandprompt/list';
import DoctorAgentCard from './DoctorAgentCard';

function DoctorAgentList() {
    // For mobile, we'll only show 3 doctors initially
    const initialDoctorCount = 3;
    const [showAll, setShowAll] = React.useState(false);
    const displayedDoctors = showAll ? AIDoctorAgents : AIDoctorAgents.slice(0, initialDoctorCount);

    return (
        <div className="w-full px-3 sm:px-4 py-4 sm:py-6">
            <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">AI Specialist Doctors</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                {displayedDoctors.map((doctor, index) => (
                    <div key={index} className="w-full">
                        <DoctorAgentCard doctor={doctor} />
                    </div>
                ))}
            </div>

            {!showAll && AIDoctorAgents.length > initialDoctorCount && (
                <div className="mt-4 text-center">
                    <button 
                        onClick={() => setShowAll(true)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        View All Doctors
                    </button>
                </div>
            )}
        </div>
    );
}

export default DoctorAgentList;