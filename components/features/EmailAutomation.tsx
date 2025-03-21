"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateEmailReply, detectEmailUrgency } from "@/services/AIFeaturesApi";

interface Email {
  id: string;
  subject: string;
  sender: string;
  content: string;
  urgency: "low" | "medium" | "high";
  timestamp: string;
}

export default function EmailAutomation() {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: "1",
      subject: "Project Update",
      sender: "john.doe@example.com",
      content: "Can you provide an update on the project status by tomorrow?",
      urgency: "high",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      subject: "Weekly Newsletter",
      sender: "newsletter@company.com",
      content: "Check out our latest newsletter with company updates.",
      urgency: "low",
      timestamp: new Date().toISOString(),
    },
    {
      id: "3",
      subject: "Meeting Reminder",
      sender: "calendar@company.com",
      content: "Reminder: Team meeting at 3 PM today.",
      urgency: "medium",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [userStyle, setUserStyle] = useState<string>(
    "Professional, concise, with a friendly tone."
  );
  
  const [isReplying, setIsReplying] = useState<string | null>(null);
  const [generatedReply, setGeneratedReply] = useState<string | null>(null);

  const handleAutoReply = async (emailId: string) => {
    const email = emails.find(e => e.id === emailId);
    if (!email) return;
    
    setIsReplying(emailId);
    setGeneratedReply(null);
    
    try {
      const result = await generateEmailReply(email.content, userStyle);
      if (result.success) {
        setGeneratedReply(result.reply);
      } else {
        alert("Failed to generate reply: " + result.error);
      }
    } catch (error) {
      console.error("Error generating reply:", error);
      alert("An error occurred while generating the reply");
    } finally {
      setIsReplying(null);
    }
  };
  
  const handleDetectUrgency = async (emailId: string) => {
    const email = emails.find(e => e.id === emailId);
    if (!email) return;
    
    try {
      const result = await detectEmailUrgency(email.content);
      if (result.success) {
        const updatedEmails = emails.map(e => {
          if (e.id === emailId) {
            return { ...e, urgency: result.urgency };
          }
          return e;
        });
        setEmails(updatedEmails);
      } else {
        alert("Failed to detect urgency: " + result.error);
      }
    } catch (error) {
      console.error("Error detecting urgency:", error);
      alert("An error occurred while detecting urgency");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Email Automation</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Communication Style</h3>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={3}
          value={userStyle}
          onChange={(e) => setUserStyle(e.target.value)}
          placeholder="Describe your communication style..."
        />
        <p className="text-sm text-gray-500 mt-1">
          AI will use this to generate replies that match your tone and style.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Inbox</h3>
        <div className="space-y-4">
          {emails.map((email) => (
            <div 
              key={email.id} 
              className={`border p-4 rounded-md ${
                email.urgency === "high" 
                  ? "border-red-500 bg-red-50" 
                  : email.urgency === "medium" 
                  ? "border-yellow-500 bg-yellow-50" 
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{email.subject}</h4>
                  <p className="text-sm text-gray-600">From: {email.sender}</p>
                </div>
                <div className="flex items-center">
                  {email.urgency === "high" && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                      Urgent
                    </span>
                  )}
                  {email.urgency === "medium" && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                      Important
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mb-3">{email.content}</p>
              
              {isReplying === email.id && (
                <div className="mb-3">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Generating reply...</p>
                </div>
              )}
              
              {generatedReply && isReplying === null && (
                <div className="mb-3 bg-blue-50 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-1">Generated Reply:</h5>
                  <p className="text-sm whitespace-pre-line">{generatedReply}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button 
                  onClick={() => handleDetectUrgency(email.id)}
                  size="sm"
                  variant="outline"
                >
                  Detect Urgency
                </Button>
                <Button 
                  onClick={() => handleAutoReply(email.id)}
                  size="sm"
                  disabled={isReplying === email.id}
                >
                  {isReplying === email.id ? "Generating..." : "Auto-Reply"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}