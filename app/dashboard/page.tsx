import { Button } from "@/components/ui/button";
import { Mail, Calendar, CheckSquare } from 'lucide-react';
import Link from "next/link";

export default function Dashboard() {
  const cards = [
    {
      title: "Email Automation",
      description: "Manage your emails with AI assistance",
      icon: Mail,
      href: "/dashboard/email",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-500",
    },
    {
      title: "Meeting Assistant",
      description: "View real-time meeting notes and action items",
      icon: Calendar,
      href: "/dashboard/meetings",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-500",
    },
    {
      title: "Task Delegation",
      description: "Manage and delegate tasks efficiently",
      icon: CheckSquare,
      href: "/dashboard/tasks",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to SynapseAI</h1>
        <p className="text-muted-foreground mt-2">
          Your AI-powered productivity assistant
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className={`p-6 rounded-lg border ${card.color} transition-all hover:shadow-md`}>
              <div className={`${card.iconColor} mb-4`}>
                <card.icon className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="text-muted-foreground mt-2">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-6 rounded-lg border bg-card">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <ul className="space-y-2 list-disc pl-5">
          <li>Configure your email settings to enable AI automation</li>
          <li>Connect your calendar for meeting assistance</li>
          <li>Set up task delegation preferences</li>
        </ul>
      </div>
    </div>
  );
}