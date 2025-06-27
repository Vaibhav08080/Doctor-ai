
'use client'
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import axios from "axios";
import { DoctorAgentCardProps } from "./DoctorAgentCard";
import DoctorAgentCard from "./DoctorAgentCard";
import { useRouter } from "next/navigation";
function Addsessiondialog() {
  const [note, setnote] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgentCardProps[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgentCardProps | null>(null);

  const onClickNext = async () => {
    setloading(true);
    try {
      const result = await axios.post("/api/suggest-doctor", { notes: note });
      setSuggestedDoctors(result.data);
    } catch (error) {
      alert("Failed to fetch doctor suggestions.");
    }
    setloading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Start Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {suggestedDoctors.length === 0 ? (
              <div>
                <h2>Add details here</h2>
                <Textarea
                  placeholder="Add your symptoms here..."
                  className="mt-1 h-[200px]"
                  onChange={(e) => setnote(e.target.value)}
                  value={note}
                  disabled={loading}
                />
              </div>
            ) : (
              <div>
                <h2>Suggested Doctors</h2>
                <div className="grid gap-4">
                  {suggestedDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      style={{
                        border: selectedDoctor?.id === doctor.id ? "2px solid #2563eb" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        cursor: "pointer",
                        padding: "12px",
                        background: selectedDoctor?.id === doctor.id ? "#f0f6ff" : "white",
                      }}
                    >
                      {/* Make sure DoctorAgentCard is imported */}
                      <DoctorAgentCard doctor={doctor} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {suggestedDoctors.length === 0 ? (
            <Button disabled={note.length === 0 || loading} onClick={onClickNext}>
              {loading ? <span className="animate-spin mr-2">⏳</span> : null}
              Submit
            </Button>
          ) : (
            <Button
              disabled={!selectedDoctor}
              onClick={() => {
                // You can handle final selection here, e.g., start session with selectedDoctor
                alert(`Selected doctor: ${selectedDoctor?.specialist}`);
              }}
            >
              Confirm Selection
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Addsessiondialog;
