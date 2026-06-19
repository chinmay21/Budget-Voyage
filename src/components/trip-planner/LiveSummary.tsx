import { TripState, DestinationData } from "./types";
import { Plane, Hotel, Utensils, Train, Ticket, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  state: TripState;
  destinations: DestinationData[];
}

export function LiveSummary({ state, destinations }: Props) {
  const selectedDest = destinations.find(d => d.slug === state.destination);
  // Dynamic cost calculations based on real database base values
  const baseFlight = selectedDest?.roundTripFlightCostUSD || 0;
  const flights = baseFlight * (state.travelers.adults + state.travelers.children * 0.8);
  
  const baseHotel = selectedDest?.hotelCostPerNightUSD || 0;
  const hotelMultiplier = state.accommodation === "Luxury Hotel" ? 2.5 : state.accommodation === "Standard Hotel" ? 1.2 : 0.8;
  const hotels = baseHotel * hotelMultiplier * state.duration * Math.ceil((state.travelers.adults + state.travelers.children) / 2);
  
  const baseFood = selectedDest?.foodCostPerPersonPerDayUSD || 0;
  const foodMultiplier = state.budgetCategory === "Luxury" ? 2.0 : state.budgetCategory === "Comfort" ? 1.2 : 0.8;
  const food = state.switches.includeFood ? baseFood * foodMultiplier * state.duration * state.travelers.adults : 0;
  
  const baseTransport = selectedDest?.localTransportCostPerPersonPerDayUSD || 0;
  const transMultiplier = state.transportPref === "Private" ? 3.0 : state.transportPref === "Mixed" ? 1.5 : 1.0;
  const transport = state.switches.includeLocalTransport ? baseTransport * transMultiplier * state.duration * state.travelers.adults : 0;
  
  const baseActivity = selectedDest?.activitiesCostPerPersonPerDayUSD || 0;
  const activityMultiplier = 1 + (state.activityPrefs.length * 0.5);
  const activitiesPerDay = baseActivity * activityMultiplier * (state.budgetCategory === "Luxury" ? 1.5 : 1);
  const activities = state.switches.includeActivities ? activitiesPerDay * state.duration * state.travelers.adults : 0;

  const totalCost = flights + hotels + food + transport + activities;
  const remainingBudget = state.budget - totalCost;
  const isSufficient = remainingBudget >= 0;
  const budgetUsedPercentage = Math.min(100, (totalCost / state.budget) * 100);

  const breakdown = [
    { name: "Flights", cost: flights, icon: Plane, color: "bg-blue-400" },
    { name: "Hotels", cost: hotels, icon: Hotel, color: "bg-indigo-400" },
    { name: "Food", cost: food, icon: Utensils, color: "bg-teal-400" },
    { name: "Transport", cost: transport, icon: Train, color: "bg-orange-400" },
    { name: "Activities", cost: activities, icon: Ticket, color: "bg-pink-400" },
  ];

  return (
    <div className="glass-card p-6 md:p-8 flex flex-col h-full sticky top-8">
      <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
        <span>Estimated Trip Cost</span>
        {state.destination && (
          <span className="text-xs font-normal px-2 py-1 bg-white/10 rounded-full">
            {state.duration} Days • {state.travelers.adults + state.travelers.children} Travelers
          </span>
        )}
      </h3>

      <div className="text-center mb-8">
        <div className="text-sm text-white/60 mb-1">Total Estimated Cost</div>
        <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-white mb-2">
          ${Math.round(totalCost).toLocaleString()}
        </div>
        <div className="text-sm text-white/50">
          Daily Average: ${Math.round(totalCost / Math.max(1, state.duration)).toLocaleString()} / day
        </div>
      </div>

      {/* Circular Chart & Progress (Simplified with progress bars) */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-white/60">Budget Utilization</span>
          <span className="font-mono">{Math.round(budgetUsedPercentage)}%</span>
        </div>
        <div className="h-3 w-full bg-navy-950 rounded-full overflow-hidden flex">
          {breakdown.map((item, idx) => {
            const percentage = totalCost > 0 ? (item.cost / totalCost) * budgetUsedPercentage : 0;
            return (
              <motion.div
                key={idx}
                className={`h-full ${item.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              />
            );
          })}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-8 flex-1">
        {breakdown.map((item, idx) => {
          if (item.cost === 0) return null;
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${item.color}/20 flex items-center justify-center text-${item.color.replace('bg-', '')}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-white/80">{item.name}</span>
              </div>
              <span className="font-mono text-sm">${Math.round(item.cost).toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      {/* Warning / Success Cards */}
      {state.budget > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            isSufficient 
              ? "bg-teal-500/10 border-teal-500/30 text-teal-300" 
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          <div className="flex items-start gap-3">
            {isSufficient ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />}
            <div>
              <div className="font-medium text-sm">
                {isSufficient ? "Budget is sufficient" : "Budget Warning"}
              </div>
              <div className="text-xs opacity-80 mt-1">
                {isSufficient 
                  ? `You can comfortably afford this trip and still save $${Math.round(remainingBudget).toLocaleString()}.` 
                  : `This trip may exceed your budget by $${Math.round(Math.abs(remainingBudget)).toLocaleString()}.`}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
