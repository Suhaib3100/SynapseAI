'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Download, Mic, MicOff, Plus, Save, Users } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  status: 'upcoming' | 'live' | 'completed';
}

interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  completed: boolean;
}

export default function MeetingAssistant() {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Weekly Team Sync',
      date: 'Today',
      time: '10:00 AM - 11:00 AM',
      participants: ['John Doe', 'Jane Smith', 'Alex Johnson', 'You'],
      status: 'live',
    },
    {
      id: '2',
      title: 'Product Planning',
      date: 'Tomorrow',
      time: '2:00 PM - 3:30 PM',
      participants: ['Jane Smith', 'Alex Johnson', 'You'],
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Client Presentation',
      date: 'Jul 15, 2023',
      time: '11:00 AM - 12:00 PM',
      participants: ['John Doe', 'You', 'Client Team'],
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Sprint Retrospective',
      date: 'Jul 10, 2023',
      time: '3:00 PM - 4:00 PM',
      participants: ['John Doe', 'Jane Smith', 'Alex Johnson', 'You'],
      status: 'completed',
    },
  ]);

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting>(meetings[0]);
  const [isRecording, setIsRecording] = useState(true);
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: '1',
      text: 'Update the project timeline document',
      assignee: 'Jane Smith',
      completed: false,
    },
    {
      id: '2',
      text: 'Schedule follow-up meeting with the design team',
      assignee: 'You',
      completed: true,
    },
    {
      id: '3',
      text: 'Share meeting notes with stakeholders',
      assignee: 'John Doe',
      completed: false,
    },
  ]);

  const [notes, setNotes] = useState<string>(
    `# Weekly Team Sync - July 13, 2023

## Agenda
- Project status updates
- Blockers and challenges
- Next steps

## Discussion Points

### Project Status
- Frontend development is 70% complete
- Backend API integration is in progress
- QA testing to begin next week

### Challenges
- Resource constraints for the mobile app development
- Timeline might need adjustment due to new requirements

### Decisions
- Prioritize core features for the initial release
- Postpone the reporting module to the next sprint
- Allocate additional resources to the mobile development team

## Next Steps
- Team to provide detailed estimates by end of day
- Schedule a separate meeting to discuss the new requirements
- Update the project plan with the revised timeline
`
  );

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleActionItemCompletion = (id: string) => {
    setActionItems(
      actionItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addActionItem = () => {
    const newItem: ActionItem = {
      id: `${actionItems.length + 1}`,
      text: 'New action item',
      assignee: 'Unassigned',
      completed: false,
    };
    setActionItems([...actionItems, newItem]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meeting Assistant</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Join Meeting
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Meeting List */}
        <div className="col-span-1 border rounded-lg overflow-hidden">
          <div className="p-3 border-b bg-muted/30">
            <h2 className="font-medium">Your Meetings</h2>
          </div>
          <div className="overflow-auto max-h-[calc(100vh-250px)]">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className={`p-3 border-b cursor-pointer transition-colors ${
                  selectedMeeting?.id === meeting.id
                    ? 'bg-accent'
                    : meeting.status === 'live'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : ''
                }`}
                onClick={() => setSelectedMeeting(meeting)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{meeting.title}</span>
                  {meeting.status === 'live' && (
                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                  <Users className="h-3 w-3" />
                  <span>{meeting.participants.length} participants</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Content */}
        <div className="col-span-3 border rounded-lg overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-muted/30">
            <div>
              <h2 className="text-xl font-semibold">{selectedMeeting.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedMeeting.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedMeeting.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{selectedMeeting.participants.join(', ')}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isRecording ? 'destructive' : 'outline'}
                size="sm"
                onClick={toggleRecording}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Notes
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-0 h-[calc(100vh-300px)]">
            {/* Real-time Notes */}
            <div className="col-span-2 border-r p-4 overflow-auto">
              <h3 className="text-lg font-medium mb-2">Meeting Notes</h3>
              {isRecording && (
                <div className="flex items-center gap-2 text-sm text-red-500 mb-4">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span>Recording in progress...</span>
                </div>
              )}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <textarea
                  className="w-full h-[calc(100vh-380px)] bg-transparent border-none focus:outline-none resize-none font-mono text-sm"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Action Items */}
            <div className="col-span-1 p-4 overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Action Items</h3>
                <Button variant="ghost" size="sm" onClick={addActionItem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {actionItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-md bg-card"
                  >
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleActionItemCompletion(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className={item.completed ? 'line-through text-muted-foreground' : ''}>
                          {item.text}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Assigned to: {item.assignee}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}