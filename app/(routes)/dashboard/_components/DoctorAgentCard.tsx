import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

 export type DoctorAgentCardProps = {
    id: number;
    specialist: string;
    description: string;
    image: string;
    agentPrompt: string;
}

interface Props {
    doctor: DoctorAgentCardProps;
}

function DoctorAgentCard({ doctor }: Props) {
    return (
        <div className="flex flex-col items-center p-5 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow h-full border border-gray-100 w-full">
            {/* Circular Profile Image */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-200 mb-4 shadow-sm">
                <Image
                    src={doctor.image}
                    alt={doctor.specialist}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 64px, 80px"
                    priority
                />
            </div>
            {/* Doctor Info */}
            <div className="text-center w-full flex-1 flex flex-col">
                <h2 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1 leading-tight mb-2">
                    {doctor.specialist}
                </h2>
                <p className="text-[12px] sm:text-xs text-gray-500 mb-7 min-h-[2.5rem] leading-tight">
                    {doctor.description}
                </p>
            </div>
            {/* Action Button */}
            <div className="w-full flex justify-center mt-2">
                <Button 
                    size="sm"
                    className="w-full rounded-full font-medium text-xs sm:text-sm min-h-[40px] py-2 bg-black text-white flex items-center justify-center gap-2 shadow hover:bg-neutral-900 transition-all whitespace-nowrap"
                >
                    <span className="whitespace-nowrap">Consult Now</span>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default DoctorAgentCard;