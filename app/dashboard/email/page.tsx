'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mail, RefreshCw, Search, Star, Trash2, Archive, Send } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
}

export default function EmailAutomation() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: 'John Doe',
      subject: 'Project Update',
      preview: 'Here are the latest updates on the project we discussed last week...',
      date: '10:30 AM',
      read: false,
      starred: false,
    },
    {
      id: '2',
      from: 'Jane Smith',
      subject: 'Meeting Tomorrow',
      preview: 'Just a reminder that we have a meeting scheduled for tomorrow at 2 PM...',
      date: 'Yesterday',
      read: true,
      starred: true,
    },
    {
      id: '3',
      from: 'Marketing Team',
      subject: 'Campaign Results',
      preview: 'The results from our latest marketing campaign are in. We saw a 25% increase in...',
      date: 'Jul 12',
      read: true,
      starred: false,
    },
    {
      id: '4',
      from: 'Support Desk',
      subject: 'Customer Feedback',
      preview: 'We received some feedback from a customer regarding the new feature...',
      date: 'Jul 10',
      read: true,
      starred: false,
    },
    {
      id: '5',
      from: 'Alex Johnson',
      subject: 'Product Roadmap',
      preview: 'I wanted to share the updated product roadmap for Q3. We have some exciting...',
      date: 'Jul 8',
      read: true,
      starred: false,
    },
  ]);

  const handleEmailClick = (email: Email) => {
    // Mark as read when clicked
    if (!email.read) {
      setEmails(emails.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      ));
    }
    setSelectedEmail(email);
  };

  const handleStarToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Email Automation</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search emails"
              className="pl-9 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Email List */}
        <div className="col-span-1 border rounded-lg overflow-hidden">
          <div className="p-3 border-b bg-muted/30">
            <h2 className="font-medium">Inbox</h2>
          </div>
          <div className="overflow-auto h-[calc(100%-48px)]">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-3 border-b cursor-pointer transition-colors ${
                  selectedEmail?.id === email.id
                    ? 'bg-accent'
                    : email.read
                    ? ''
                    : 'bg-blue-50 dark:bg-blue-900/20'
                }`}
                onClick={() => handleEmailClick(email)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-medium ${!email.read && 'font-semibold'}`}>
                    {email.from}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{email.date}</span>
                    <button
                      onClick={(e) => handleStarToggle(email.id, e)}
                      className="text-muted-foreground hover:text-yellow-400"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          email.starred ? 'fill-yellow-400 text-yellow-400' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className={`${!email.read && 'font-medium'}`}>{email.subject}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {email.preview}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="col-span-2 border rounded-lg overflow-hidden">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{selectedEmail.from}</div>
                    <div className="text-sm text-muted-foreground">
                      to me
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedEmail.date}
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex-grow overflow-auto">
                <p className="whitespace-pre-line">
                  {selectedEmail.preview}
                  {"\n\n"}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                  {"\n\n"}
                  Best regards,
                  {"\n"}
                  {selectedEmail.from.split(' ')[0]}
                </p>
              </div>
              
              <div className="p-4 border-t bg-muted/30">
                <div className="flex gap-3">
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline">
                    Summarize
                  </Button>
                  <Button variant="outline">
                    Tone Switch
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Select an email to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}