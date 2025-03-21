"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Meeting {
  id: string;
  title: string;
  date: string;
  participants: string[];
  transcript: string;
  summary: string | null;
}

export default function MeetingAssistant() {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Product Strategy Meeting",
      date: "2023-06-15",
      participants: ["John Doe", "Jane Smith", "Robert Johnson"],
      transcript: "John: Let's discuss the roadmap for Q3.\nJane: I think we should prioritize the new UI features.\nRobert: Agreed, but we also need to address the performance issues.\nJohn: Good point. Let's allocate resources for both initiatives.",
      summary: null,
    },
    {
      id: "2",
      title: "Weekly Team Sync",
      date: "2023-06-10",
      participants: ["Team Alpha", "Team Beta"],
      transcript: "Team Alpha: We completed the authentication module.\nTeam Beta: We're still working on the payment integration.\nTeam Alpha: Do you need any help with that?\nTeam Beta: Yes, we could use some assistance with the Stripe API.",
      summary: null,
    },
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");

  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would connect to the Whisper API
    // and start transcribing audio in real-time
    setCurrentTranscript("Recording started... (This is a simulation)");
    
    // Simulate incoming transcription
    const interval = setInterval(() => {
      setCurrentTranscript(prev => 
        prev + "\nParticipant " + Math.floor(Math.random() * 3 + 1) + 
        ": " + getRandomSentence()
      );
    }, 3000);
    
    // Store the interval ID for cleanup
    window.sessionStorage.setItem('transcriptionInterval', interval.toString());
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Clear the interval
    const intervalId = window.sessionStorage.getItem('transcriptionInterval');
    if (intervalId) {
      clearInterval(parseInt(intervalId));
      window.sessionStorage.removeItem('transcriptionInterval');
    }
    
    // In a real implementation, this would stop the Whisper API connection
    setCurrentTranscript(prev => prev + "\n(Recording stopped)");
  };

  const generateSummary = (meetingId: string) => {
    // In a real implementation, this would call GPT-4 to generate a summary
    // based on the meeting transcript
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === meetingId) {
        return {
          ...meeting,
          summary: "This is an AI-generated summary of the meeting. Key points discussed include feature prioritization, resource allocation, and team collaboration. Action items: 1) Allocate resources for UI improvements, 2) Address performance issues, 3) Schedule follow-up meeting next week."
        };
      }
      return meeting;
    });
    
    setMeetings(updatedMeetings);
  };

  // Helper function to generate random sentences for the simulation
  const getRandomSentence = () => {
    const sentences = [
      "I think we should focus on user experience.",
      "The deadline for this project is next month.",
      "We need to allocate more resources to the backend team.",
      "Has anyone reviewed the latest metrics?",
      "Let's schedule a follow-up meeting next week.",
      "The client feedback has been positive so far.",
      "We should consider implementing the new API.",
      "What's the status on the bug fixes?",
      "I'll send out the documentation by tomorrow.",
      "Can we discuss the budget constraints?"
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Meeting Assistant</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Real-time Transcription</h3>
        <div className="border rounded-md p-4 bg-gray-50 min-h-[150px] mb-3">
          {currentTranscript ? (
            <pre className="whitespace-pre-wrap text-sm">{currentTranscript}</pre>
          ) : (
            <p className="text-gray-500 italic">Start recording to see transcription here...</p>
          )}
        </div>
        <div className="flex space-x-3">
          {!isRecording ? (
            <Button onClick={startRecording}>
              Start Recording
            </Button>
          ) : (
            <Button onClick={stopRecording} variant="destructive">
              Stop Recording
            </Button>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Past Meetings</h3>
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="border p-4 rounded-md">
              <div className="mb-2">
                <h4 className="font-semibold">{meeting.title}</h4>
                <p className="text-sm text-gray-600">Date: {meeting.date}</p>
                <p className="text-sm text-gray-600">
                  Participants: {meeting.participants.join(", ")}
                </p>
              </div>
              
              <div className="mb-3">
                <h5 className="font-medium text-sm mb-1">Transcript:</h5>
                <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded">
                  {meeting.transcript}
                </pre>
              </div>
              
              {meeting.summary ? (
                <div className="mb-3">
                  <h5 className="font-medium text-sm mb-1">AI Summary:</h5>
                  <div className="bg-blue-50 p-2 rounded text-sm whitespace-pre-line">
                    {meeting.summary}
                  </div>
                </div>
              ) : isGeneratingSummary === meeting.id ? (
                <div className="mb-3">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Generating summary...</p>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button 
                    onClick={() => generateSummary(meeting.id)}
                    size="sm"
                    disabled={isGeneratingSummary !== null}
                  >
                    Generate Summary
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}