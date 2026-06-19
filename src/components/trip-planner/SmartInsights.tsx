import { TripState } from "./types";
import { Lightbulb, TrendingDown, Clock, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
  state: TripState;
}

export function SmartInsights({ state }: Props) {
  const [insights, setInsights] = useState<{ id: string; icon: any; text: string; color: string }[]>([]);

  useEffect(() => {
    // Generate dynamic insights based on state
    const newInsights = [];

    if (state.departureMonth.endsWith("-09")) {
      newInsights.push({
        id: "month",
        icon: TrendingDown,
        text: "Traveling in September could save you 18% on flights compared to peak season.",
        color: "text-teal-400 bg-teal-400/10 border-teal-400/20"
      });
    }

    if (state.accommodation === "Luxury Hotel" && state.budgetCategory !== "Luxury") {
      newInsights.push({
        id: "acc",
        icon: Lightbulb,
        text: "Reducing your hotel category to 'Standard' could save approximately $300.",
        color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20"
      });
    }

    if (state.duration > 1) {
      newInsights.push({
        id: "dur",
        icon: Clock,
        text: `Adding one extra day will increase total costs by approximately $${state.budgetCategory === "Luxury" ? 250 : 120}.`,
        color: "text-blue-400 bg-blue-400/10 border-blue-400/20"
      });
    }
    
    if (newInsights.length === 0) {
      newInsights.push({
        id: "generic",
        icon: TrendingUp,
        text: "Booking 3 months in advance usually yields the best flight prices for this destination.",
        color: "text-pink-400 bg-pink-400/10 border-pink-400/20"
      });
    }

    setInsights(newInsights);
  }, [state]);

  if (insights.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-white/60 flex items-center gap-2">
        <Lightbulb className="w-4 h-4" />
        Smart Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
        <AnimatePresence>
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`p-4 rounded-xl border ${insight.color} flex items-start gap-3`}
              >
                <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">{insight.text}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
