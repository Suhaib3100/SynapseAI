import { Button } from "@/components/ui/button";
import EmailAutomation from "@/components/features/EmailAutomation";
import MeetingAssistant from "@/components/features/MeetingAssistant";
import TaskDelegation from "@/components/features/TaskDelegation";
import VoiceAssistant from "@/components/features/VoiceAssistant";

export default function AIFeatures() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">AI Features</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EmailAutomation />
        <MeetingAssistant />
        <TaskDelegation />
        <VoiceAssistant />
      </div>
    </div>
  );
}