"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  priority: "low" | "medium" | "high";
  source: "email" | "chat" | "meeting" | "manual";
  status: "pending" | "in-progress" | "completed";
  assignedTo: string | null;
}

interface Integration {
  id: string;
  name: "Trello" | "Notion" | "Google Calendar";
  isConnected: boolean;
}

export default function TaskDelegation() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Prepare quarterly report",
      description: "Compile Q2 financial data and create presentation",
      dueDate: "2023-07-15",
      priority: "high",
      source: "email",
      status: "pending",
      assignedTo: null,
    },
    {
      id: "2",
      title: "Review marketing materials",
      description: "Check new brochure designs from the design team",
      dueDate: "2023-07-10",
      priority: "medium",
      source: "chat",
      status: "pending",
      assignedTo: null,
    },
    {
      id: "3",
      title: "Schedule team building event",
      description: "Find venue and activities for the team outing",
      dueDate: "2023-08-01",
      priority: "low",
      source: "meeting",
      status: "pending",
      assignedTo: null,
    },
  ]);

  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "1", name: "Trello", isConnected: false },
    { id: "2", name: "Notion", isConnected: false },
    { id: "3", name: "Google Calendar", isConnected: false },
  ]);

  const [newTaskInput, setNewTaskInput] = useState("");

  const detectTasksFromText = () => {
    if (!newTaskInput.trim()) return;
    
    // In a real implementation, this would use NLP to detect tasks
    // For this demo, we'll simulate task detection with a simple algorithm
    const lines = newTaskInput.split('\n');
    const detectedTasks: Task[] = [];
    
    lines.forEach((line, index) => {
      if (line.includes("need to") || line.includes("should") || line.includes("must") || 
          line.includes("by") || line.includes("due") || line.toLowerCase().includes("task")) {
        detectedTasks.push({
          id: `new-${Date.now()}-${index}`,
          title: line.trim(),
          description: "Automatically detected from input text",
          dueDate: null,
          priority: "medium",
          source: "manual",
          status: "pending",
          assignedTo: null,
        });
      }
    });
    
    if (detectedTasks.length > 0) {
      setTasks([...tasks, ...detectedTasks]);
      setNewTaskInput("");
    } else {
      // If no tasks were detected, create a generic one from the input
      const newTask: Task = {
        id: `new-${Date.now()}`,
        title: newTaskInput.trim(),
        description: "Manually added task",
        dueDate: null,
        priority: "medium",
        source: "manual",
        status: "pending",
        assignedTo: null,
      };
      setTasks([...tasks, newTask]);
      setNewTaskInput("");
    }
  };

  const toggleIntegration = (integrationId: string) => {
    const updatedIntegrations = integrations.map(integration => {
      if (integration.id === integrationId) {
        return {
          ...integration,
          isConnected: !integration.isConnected
        };
      }
      return integration;
    });
    
    setIntegrations(updatedIntegrations);
    
    // In a real implementation, this would handle OAuth flow or API key setup
    const integration = integrations.find(i => i.id === integrationId);
    if (integration) {
      alert(`${integration.isConnected ? 'Disconnected from' : 'Connected to'} ${integration.name}`);
    }
  };

  const syncTask = (taskId: string) => {
    // In a real implementation, this would sync the task with the connected integrations
    const connectedIntegrations = integrations.filter(i => i.isConnected);
    if (connectedIntegrations.length === 0) {
      alert("Please connect at least one integration first");
      return;
    }
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const integrationNames = connectedIntegrations.map(i => i.name).join(", ");
      alert(`Task "${task.title}" synced with ${integrationNames}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Task Delegation</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Detect Tasks from Text</h3>
        <textarea
          className="w-full p-2 border rounded-md mb-3"
          rows={4}
          value={newTaskInput}
          onChange={(e) => setNewTaskInput(e.target.value)}
          placeholder="Paste email content, meeting notes, or chat messages here..."
        />
        <Button onClick={detectTasksFromText}>
          Detect Tasks
        </Button>
        <p className="text-sm text-gray-500 mt-1">
          AI will analyze the text and extract potential tasks automatically.
        </p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Integrations</h3>
        <div className="flex flex-wrap gap-3">
          {integrations.map((integration) => (
            <button
              key={integration.id}
              onClick={() => toggleIntegration(integration.id)}
              className={`px-4 py-2 rounded-md border ${
                integration.isConnected 
                  ? 'bg-green-100 border-green-500 text-green-700' 
                  : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
            >
              {integration.name}
              {integration.isConnected ? ' (Connected)' : ' (Connect)'}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Tasks</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`border p-4 rounded-md ${
                task.priority === "high" 
                  ? "border-red-200" 
                  : task.priority === "medium" 
                  ? "border-yellow-200" 
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  {task.dueDate && (
                    <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                    task.priority === "high" 
                      ? "bg-red-100 text-red-800" 
                      : task.priority === "medium" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {task.source}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  onClick={() => syncTask(task.id)}
                  size="sm"
                  variant="outline"
                >
                  Sync
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}