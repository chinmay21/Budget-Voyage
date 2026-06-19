import { TripState, BudgetCategory } from "./types";
import { DollarSign, Star, Utensils, Activity, Sparkles, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  state: TripState;
  updateState: (updates: Partial<TripState>) => void;
}

const BUDGET_CATEGORIES: {
  id: BudgetCategory;
  title: string;
  icon: any;
  hotel: string;
  food: string;
  activity: string;
  range: string;
  color: string;
}[] = [
  {
    id: "Budget",
    title: "Budget Traveler",
    icon: Coffee,
    hotel: "Hostels & Budget Stays",
    food: "Street food & Local eateries",
    activity: "Free sights & Self-guided",
    range: "$50 - $100 / day",
    color: "from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/50 shadow-blue-500/20"
  },
  {
    id: "Comfort",
    title: "Comfort Traveler",
    icon: Star,
    hotel: "3-4 Star Hotels & Airbnbs",
    food: "Mix of local spots & nice restaurants",
    activity: "Guided tours & Some paid attractions",
    range: "$100 - $250 / day",
    color: "from-indigo-500/20 to-indigo-600/20 text-indigo-400 border-indigo-500/50 shadow-indigo-500/20"
  },
  {
    id: "Luxury",
    title: "Luxury Traveler",
    icon: Sparkles,
    hotel: "5-Star Resorts & Boutique",
    food: "Fine dining & Upscale venues",
    activity: "Private tours & Premium experiences",
    range: "$250+ / day",
    color: "from-teal-500/20 to-teal-600/20 text-teal-400 border-teal-500/50 shadow-teal-500/20"
  }
];

export function StepBudget({ state, updateState }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Set Your Budget</h2>
        <p className="text-white/60">How much are you planning to spend for the entire trip?</p>
      </div>

      {/* Budget Input Slider & Text */}
      <div className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Total Budget</label>
            <p className="text-xs text-white/50">For {state.travelers.adults} traveler(s) over {state.duration} days</p>
          </div>
          <div className="relative w-full md:w-48">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="number"
              min="100"
              step="100"
              value={state.budget}
              onChange={(e) => updateState({ budget: Number(e.target.value) || 0 })}
              className="glass-input w-full pl-10 text-lg font-bold font-mono"
            />
          </div>
        </div>

        <div className="relative pt-4 pb-2">
          <input
            type="range"
            min="500"
            max="10000"
            step="100"
            value={state.budget}
            onChange={(e) => updateState({ budget: Number(e.target.value) })}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-white/40 mt-2 font-mono">
            <span>$500</span>
            <span>$5,000</span>
            <span>$10,000+</span>
          </div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-white/80">Travel Style</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BUDGET_CATEGORIES.map((cat) => {
            const isSelected = state.budgetCategory === cat.id;
            const Icon = cat.icon;

            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateState({ budgetCategory: cat.id })}
                className={cn(
                  "text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col h-full",
                  isSelected
                    ? `bg-gradient-to-br ${cat.color} shadow-lg`
                    : "bg-white/5 border-white/10 hover:border-white/20 text-white/70"
                )}
              >
                {/* Glow effect for selected */}
                {isSelected && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-lg opacity-50" />
                )}
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-2 rounded-lg", isSelected ? "bg-white/10" : "bg-white/5")}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <h3 className={cn("text-lg font-bold mb-1", isSelected ? "text-white" : "")}>
                    {cat.title}
                  </h3>
                  <div className="text-sm font-mono mb-4 text-white/60">
                    {cat.range}
                  </div>
                  
                  <div className="space-y-2 mt-auto text-xs">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 opacity-50" />
                      <span className="opacity-80">{cat.hotel}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 opacity-50" />
                      <span className="opacity-80">{cat.food}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 opacity-50" />
                      <span className="opacity-80">{cat.activity}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
