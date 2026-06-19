import { MapPin, Calendar, Users, Briefcase, Heart, User, UsersRound } from "lucide-react";
import { TripState, TripType, DestinationData } from "./types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  state: TripState;
  updateState: (updates: Partial<TripState>) => void;
  destinations: DestinationData[];
}

const TRIP_TYPES: { id: TripType; icon: any; label: string }[] = [
  { id: "Solo", icon: User, label: "Solo" },
  { id: "Couple", icon: Heart, label: "Couple" },
  { id: "Friends", icon: UsersRound, label: "Friends" },
  { id: "Family", icon: Users, label: "Family" },
  { id: "Business", icon: Briefcase, label: "Business" },
];

export function StepDestination({ state, updateState, destinations }: Props) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Where Are You Going?</h2>
        <p className="text-white/60">Let's start with the basics of your trip.</p>
      </div>

      <div className="space-y-6">
        {/* Destination Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Destination</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-white/40" />
            </div>
            <select
              value={state.destination}
              onChange={(e) => {
                const slug = e.target.value;
                updateState({ destination: slug });
                router.push(`/plan/${slug}`);
              }}
              className="glass-input w-full pl-11 appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-navy-900">Select a destination</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug} className="bg-navy-900 text-white py-2">
                  📍 {d.city}, {d.country}
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* Duration and Travelers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Trip Duration (Days)</label>
            <div className="flex items-center glass-input p-1">
              <button
                onClick={() => updateState({ duration: Math.max(1, state.duration - 1) })}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center font-medium">{state.duration} Days</div>
              <button
                onClick={() => updateState({ duration: state.duration + 1 })}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Travelers (Adults)</label>
            <div className="flex items-center glass-input p-1">
              <button
                onClick={() => updateState({ travelers: { ...state.travelers, adults: Math.max(1, state.travelers.adults - 1) } })}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center font-medium">{state.travelers.adults}</div>
              <button
                onClick={() => updateState({ travelers: { ...state.travelers, adults: state.travelers.adults + 1 } })}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Departure Month */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Departure Month</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="month"
              value={state.departureMonth}
              onChange={(e) => updateState({ departureMonth: e.target.value })}
              className="glass-input w-full pl-11 [color-scheme:dark]"
            />
          </div>
          <p className="text-xs text-teal-400 mt-1 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            Great choice! This is usually shoulder season with great prices.
          </p>
        </div>

        {/* Trip Type */}
        <div className="space-y-3 pt-2">
          <label className="block text-sm font-medium text-white/80">Trip Type (Optional)</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {TRIP_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = state.tripType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => updateState({ tripType: type.id })}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300",
                    isSelected 
                      ? "bg-indigo-500/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-indigo-300" 
                      : "border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
