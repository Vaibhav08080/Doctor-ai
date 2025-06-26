import React from 'react' 
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button';
import DoctorAgentList from './_components/DoctorAgentList';
const DashboardPage = () => {
  return (
    <div className="w-full px-4 pt-4">
      {/* Header section */}
      <div className="w-full flex justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">My Dashboard</h2>
        <Button>
          + Consult With Doctor
        </Button>
      </div>

      {/* History list */}
      <div className="w-full mt-8">
        <HistoryList />
      </div>
      <div>
        <DoctorAgentList />
      </div>
    </div>
  )
}

export default DashboardPage;