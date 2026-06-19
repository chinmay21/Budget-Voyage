import { PlanTripClient } from "@/components/trip-planner/PlanTripClient";

export const metadata = {
  title: "Plan Trip | Voyago",
  description: "Plan your perfect trip with AI-powered budget estimates.",
};

export default function PlanTripPage() {
  return (
    <main className="min-h-screen bg-navy-900 overflow-hidden relative">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
      <div className="absolute -top-[300px] -right-[300px] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[200px] -left-[200px] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Client Component Layout */}
      <PlanTripClient />
    </main>
  );
}
