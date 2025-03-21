import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">SynapseAI</h1>
      <p className="text-lg mb-8">Behavior-Driven Automation & AI Talent Marketplace</p>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Link href="/features/ai">
          <Button className="w-full sm:w-auto">
            Explore AI Features
          </Button>
        </Link>
      </div>
    </div>
  );
}