"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
  return (
    <div>
      {historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <Image
            src="/Medicine-bro.svg"
            alt="No history"
            width={120}
            height={120}
            className="mb-4 md:w-[140px] md:h-[140px] w-[100px] h-[100px]"
          />
          <h2 className="font-semibold text-lg md:text-xl mb-1 text-center">No Recent Consultations</h2>
          <p className="text-gray-500 text-sm md:text-base text-center max-w-md">It looks like you haven't consulted with any doctors yet.</p>
          <Button>Start Consultation</Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default HistoryList;
