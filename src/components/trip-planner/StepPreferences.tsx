import { TripState, AccommodationPref, ActivityPref, TransportPref } from "./types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  state: TripState;
  updateState: (updates: Partial<TripState>) => void;
}

const ACCOMMODATIONS: AccommodationPref[] = ["Hostel", "Budget Hotel", "Standard Hotel", "Luxury Hotel"];
const ACTIVITIES: ActivityPref[] = ["Sightseeing", "Adventure", "Shopping", "Nightlife", "Nature", "Culture"];
const TRANSPORTS: TransportPref[] = ["Public Transport", "Mixed", "Private"];

export function StepPreferences({ state, updateState }: Props) {
  const toggleActivity = (activity: ActivityPref) => {
    const current = state.activityPrefs;
    if (current.includes(activity)) {
      updateState({ activityPrefs: current.filter(a => a !== activity) });
    } else {
      updateState({ activityPrefs: [...current, activity] });
    }
  };

  const toggleSwitch = (key: keyof TripState["switches"]) => {
    updateState({
      switches: {
        ...state.switches,
        [key]: !state.switches[key]
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Customize Your Trip</h2>
        <p className="text-white/60">Tell us what's important to you to refine your budget.</p>
      </div>

      <div className="space-y-6">
        {/* Accommodation */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white/80">Accommodation Preference</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ACCOMMODATIONS.map(acc => (
              <button
                key={acc}
                onClick={() => updateState({ accommodation: acc })}
                className={cn(
                  "p-3 rounded-xl border text-sm font-medium transition-all",
                  state.accommodation === acc
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                {acc}
              </button>
            ))}
          </div>
        </div>

        {/* Transportation */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white/80">Transportation Preference</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TRANSPORTS.map(trans => (
              <button
                key={trans}
                onClick={() => updateState({ transportPref: trans })}
                className={cn(
                  "p-3 rounded-xl border text-sm font-medium transition-all",
                  state.transportPref === trans
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                {trans}
              </button>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white/80">Activity Preferences</label>
          <div className="flex flex-wrap gap-3">
            {ACTIVITIES.map(act => {
              const isSelected = state.activityPrefs.includes(act);
              return (
                <button
                  key={act}
                  onClick={() => toggleActivity(act)}
                  className={cn(
                    "px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2",
                    isSelected
                      ? "bg-teal-500/20 border-teal-500 text-teal-300"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  {act}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inclusions (Switches) */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <label className="block text-sm font-medium text-white/80">Cost Inclusions</label>
          <div className="space-y-3">
            {[
              { id: "includeActivities", label: "Include Activities & Tours" },
              { id: "includeLocalTransport", label: "Include Local Transport" },
              { id: "includeFood", label: "Include Food & Dining Costs" },
            ].map((item) => {
              const key = item.id as keyof TripState["switches"];
              const isChecked = state.switches[key];
              
              return (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-medium text-white/80">{item.label}</span>
                  <button
                    onClick={() => toggleSwitch(key)}
                    className={cn(
                      "w-11 h-6 rounded-full relative transition-colors duration-300 focus:outline-none",
                      isChecked ? "bg-indigo-500" : "bg-white/20"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-300",
                        isChecked ? "left-6" : "left-1"
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
