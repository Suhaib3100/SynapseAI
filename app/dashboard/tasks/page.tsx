'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  CheckSquare, 
  Clock, 
  Edit, 
  Filter, 
  Plus, 
  Search, 
  Trash2, 
  User,
  Calendar,
  X
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  tags: string[];
}

export default function TaskDelegation() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete frontend design',
      description: 'Finish the UI design for the dashboard and get feedback from the team.',
      assignee: 'Jane Smith',
      dueDate: 'Tomorrow',
      priority: 'high',
      status: 'in-progress',
      tags: ['design', 'frontend'],
    },
    {
      id: '2',
      title: 'API integration',
      description: 'Integrate the backend API with the frontend components.',
      assignee: 'John Doe',
      dueDate: 'Jul 20, 2023',
      priority: 'medium',
      status: 'todo',
      tags: ['backend', 'api'],
    },
    {
      id: '3',
      title: 'Write documentation',
      description: 'Create comprehensive documentation for the new features.',
      assignee: 'You',
      dueDate: 'Jul 25, 2023',
      priority: 'low',
      status: 'todo',
      tags: ['documentation'],
    },
    {
      id: '4',
      title: 'Bug fixes',
      description: 'Address the critical bugs reported in the latest release.',
      assignee: 'Alex Johnson',
      dueDate: 'Today',
      priority: 'high',
      status: 'in-progress',
      tags: ['bugs', 'maintenance'],
    },
    {
      id: '5',
      title: 'User testing',
      description: 'Conduct user testing sessions for the new features.',
      assignee: 'Jane Smith',
      dueDate: 'Jul 18, 2023',
      priority: 'medium',
      status: 'todo',
      tags: ['testing', 'user-experience'],
    },
    {
      id: '6',
      title: 'Weekly report',
      description: 'Prepare the weekly progress report for stakeholders.',
      assignee: 'You',
      dueDate: 'Yesterday',
      priority: 'medium',
      status: 'completed',
      tags: ['reporting'],
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTask({...selectedTask!});
  };

  const handleSaveEdit = () => {
    if (editedTask) {
      setTasks(tasks.map(task => 
        task.id === editedTask.id ? editedTask : task
      ));
      setSelectedTask(editedTask);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: `${tasks.length + 1}`,
      title: 'New Task',
      description: 'Task description',
      assignee: 'Unassigned',
      dueDate: 'No due date',
      priority: 'medium',
      status: 'todo',
      tags: [],
    };
    setTasks([...tasks, newTask]);
    setSelectedTask(newTask);
    setEditedTask(newTask);
    setIsEditing(true);
  };

  const handleStatusChange = (id: string, status: 'todo' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
    if (selectedTask?.id === id) {
      setSelectedTask({...selectedTask, status});
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Delegation</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks"
              className="pl-9 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none pr-8"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <Filter className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="col-span-1 border rounded-lg overflow-hidden">
          <div className="p-3 border-b bg-muted/30">
            <h2 className="font-medium">Tasks ({filteredTasks.length})</h2>
          </div>
          <div className="overflow-auto max-h-[calc(100vh-250px)]">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 border-b cursor-pointer transition-colors ${
                    selectedTask?.id === task.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground gap-2 mb-1">
                    <User className="h-3 w-3" />
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center text-sm gap-2">
                    <Clock className={`h-3 w-3 ${getPriorityColor(task.priority)}`} />
                    <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No tasks found
              </div>
            )}
          </div>
        </div>

        {/* Task Details */}
        <div className="col-span-2 border rounded-lg overflow-hidden">
          {selectedTask ? (
            <div className="h-full flex flex-col">
              {isEditing ? (
                // Edit Mode
                <div className="p-4 flex-grow overflow-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={editedTask?.title}
                        onChange={(e) => setEditedTask({...editedTask!, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
                        value={editedTask?.description}
                        onChange={(e) => setEditedTask({...editedTask!, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Assignee</label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={editedTask?.assignee}
                          onChange={(e) => setEditedTask({...editedTask!, assignee: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Due Date</label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={editedTask?.dueDate}
                          onChange={(e) => setEditedTask({...editedTask!, dueDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Priority</label>
                        <select
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={editedTask?.priority}
                          onChange={(e) => setEditedTask({...editedTask!, priority: e.target.value as 'low' | 'medium' | 'high'})}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={editedTask?.status}
                          onChange={(e) => setEditedTask({...editedTask!, status: e.target.value as 'todo' | 'in-progress' | 'completed'})}
                        >
                          <option value="todo">To Do</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={editedTask?.tags.join(', ')}
                        onChange={(e) => setEditedTask({...editedTask!, tags: e.target.value.split(',').map(tag => tag.trim())})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="p-4 border-b flex justify-between items-center bg-muted/30">
                    <h2 className="text-xl font-semibold">{selectedTask.title}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleEditClick}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteTask(selectedTask.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 flex-grow overflow-auto">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Assignee</span>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{selectedTask.assignee}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Due Date</span>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{selectedTask.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Priority</span>
                          <div className="flex items-center gap-2">
                            <Clock className={`h-4 w-4 ${getPriorityColor(selectedTask.priority)}`} />
                            <span className={getPriorityColor(selectedTask.priority)}>
                              {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Status</span>
                          <div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(selectedTask.status)}`}>
                              {selectedTask.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-sm text-muted-foreground mb-2">Description</h3>
                      <p className="text-sm">{selectedTask.description}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTask.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-1 bg-muted rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t bg-muted/30">
                    <div className="flex gap-2">
                      <Button 
                        variant={selectedTask.status === 'todo' ? 'default' : 'outline'}
                        onClick={() => handleStatusChange(selectedTask.id, 'todo')}
                        disabled={selectedTask.status === 'todo'}
                      >
                        To Do
                      </Button>
                      <Button 
                        variant={selectedTask.status === 'in-progress' ? 'default' : 'outline'}
                        onClick={() => handleStatusChange(selectedTask.id, 'in-progress')}
                        disabled={selectedTask.status === 'in-progress'}
                      >
                        In Progress
                      </Button>
                      <Button 
                        variant={selectedTask.status === 'completed' ? 'default' : 'outline'}
                        onClick={() => handleStatusChange(selectedTask.id, 'completed')}
                        disabled={selectedTask.status === 'completed'}
                      >
                        <CheckSquare className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Select a task to view details</p>
                <Button className="mt-4" onClick={handleAddTask}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Task
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}