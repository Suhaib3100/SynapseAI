import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to SynapseAI</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        Your AI-powered productivity assistant for email automation, meeting assistance, and task delegation.
      </p>
      <Link href="/dashboard">
        <Button size="lg" className="gap-2">
          Go to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}