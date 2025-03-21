"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VoiceProfile {
  id: string;
  name: string;
  description: string;
  sample: string; // URL to audio sample in a real implementation
  isCloned: boolean;
}

interface PhoneCall {
  id: string;
  recipient: string;
  purpose: string;
  duration: string;
  status: "scheduled" | "completed" | "failed";
  date: string;
}

export default function VoiceAssistant() {
  const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>([
    {
      id: "1",
      name: "Professional Voice",
      description: "Clear, articulate voice for business calls",
      sample: "/sample-professional.mp3",
      isCloned: false,
    },
    {
      id: "2",
      name: "Casual Voice",
      description: "Friendly, conversational tone for informal calls",
      sample: "/sample-casual.mp3",
      isCloned: false,
    },
  ]);

  const [calls, setCalls] = useState<PhoneCall[]>([
    {
      id: "1",
      recipient: "+1 (555) 123-4567",
      purpose: "Schedule appointment",
      duration: "3:45",
      status: "completed",
      date: "2023-06-15",
    },
    {
      id: "2",
      recipient: "+1 (555) 987-6543",
      purpose: "Follow up on proposal",
      duration: "5:12",
      status: "completed",
      date: "2023-06-10",
    },
  ]);

  const [newCallRecipient, setNewCallRecipient] = useState("");
  const [newCallPurpose, setNewCallPurpose] = useState("");
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);

  const startVoiceCloning = () => {
    // In a real implementation, this would start recording and send audio to ElevenLabs
    setIsRecording(true);
    
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    setRecordingInterval(interval);
  };

  const stopVoiceCloning = () => {
    setIsRecording(false);
    
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    
    // In a real implementation, this would stop recording and process the audio
    // For this demo, we'll simulate voice cloning by updating a profile
    const updatedProfiles = voiceProfiles.map(profile => {
      if (profile.id === "1") { // Just update the first profile for demo
        return {
          ...profile,
          name: "My Cloned Voice",
          description: "Personal voice clone based on my speech patterns",
          isCloned: true,
        };
      }
      return profile;
    });
    
    setVoiceProfiles(updatedProfiles);
    setSelectedVoiceId("1"); // Auto-select the cloned voice
    setRecordingTime(0);
    
    alert("Voice cloning completed! Your voice is now available for use.");
  };

  const scheduleCall = () => {
    if (!newCallRecipient || !newCallPurpose || !selectedVoiceId) {
      alert("Please fill in all fields and select a voice profile");
      return;
    }
    
    // In a real implementation, this would integrate with Twilio to schedule a call
    const newCall: PhoneCall = {
      id: `new-${Date.now()}`,
      recipient: newCallRecipient,
      purpose: newCallPurpose,
      duration: "0:00", // Not yet made
      status: "scheduled",
      date: new Date().toISOString().split('T')[0],
    };
    
    setCalls([newCall, ...calls]);
    setNewCallRecipient("");
    setNewCallPurpose("");
    
    alert(`Call scheduled to ${newCallRecipient} using ${
      voiceProfiles.find(v => v.id === selectedVoiceId)?.name
    }`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Voice Assistant</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Voice Cloning</h3>
        <div className="bg-gray-50 p-4 rounded-md mb-3">
          {isRecording ? (
            <div className="text-center">
              <div className="text-red-500 mb-2">Recording... {formatTime(recordingTime)}</div>
              <p className="text-sm text-gray-600 mb-3">
                Please read the following text clearly:
                <br />
                "The quick brown fox jumps over the lazy dog. Voice cloning requires at least 30 seconds of clear speech to create an accurate model."
              </p>
              <Button 
                onClick={stopVoiceCloning}
                variant="destructive"
              >
                Stop Recording
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Create a clone of your voice for AI-powered calls. The system needs about 30 seconds of your speech.
              </p>
              <Button onClick={startVoiceCloning}>
                Start Voice Cloning
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Voice Profiles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {voiceProfiles.map((profile) => (
            <div 
              key={profile.id}
              onClick={() => setSelectedVoiceId(profile.id)}
              className={`border p-3 rounded-md cursor-pointer ${
                selectedVoiceId === profile.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">
                  {profile.name}
                  {profile.isCloned && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Cloned
                    </span>
                  )}
                </h4>
              </div>
              <p className="text-sm text-gray-600">{profile.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Schedule AI Call</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Phone Number
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={newCallRecipient}
              onChange={(e) => setNewCallRecipient(e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Call Purpose
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={newCallPurpose}
              onChange={(e) => setNewCallPurpose(e.target.value)}
              placeholder="e.g., Schedule appointment, Follow up on proposal"
            />
          </div>
          <Button 
            onClick={scheduleCall}
            disabled={!selectedVoiceId || !newCallRecipient || !newCallPurpose}
          >
            Schedule Call
          </Button>
          <p className="text-sm text-gray-500">
            AI will make the call using your selected voice profile and handle the conversation based on the purpose.
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Call History</h3>
        <div className="space-y-3">
          {calls.map((call) => (
            <div key={call.id} className="border p-3 rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{call.recipient}</h4>
                  <p className="text-sm text-gray-600">Purpose: {call.purpose}</p>
                  <p className="text-sm text-gray-600">Date: {call.date}</p>
                  {call.status === "completed" && (
                    <p className="text-sm text-gray-600">Duration: {call.duration}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  call.status === "completed" 
                    ? "bg-green-100 text-green-800" 
                    : call.status === "scheduled" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}