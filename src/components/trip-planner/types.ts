export type TripType = "Solo" | "Couple" | "Friends" | "Family" | "Business";
export type BudgetCategory = "Budget" | "Comfort" | "Luxury";
export type AccommodationPref = "Hostel" | "Budget Hotel" | "Standard Hotel" | "Luxury Hotel";
export type ActivityPref = "Sightseeing" | "Adventure" | "Shopping" | "Nightlife" | "Nature" | "Culture";
export type TransportPref = "Public Transport" | "Mixed" | "Private";

export interface TripState {
  // Step 1
  destination: string;
  duration: number;
  travelers: {
    adults: number;
    children: number;
  };
  departureMonth: string;
  tripType: TripType;

  // Step 2
  budget: number;
  budgetCategory: BudgetCategory;

  // Step 3
  accommodation: AccommodationPref;
  activityPrefs: ActivityPref[];
  transportPref: TransportPref;
  switches: {
    includeActivities: boolean;
    includeLocalTransport: boolean;
    includeFood: boolean;
  };
}

export const initialTripState: TripState = {
  destination: "",
  duration: 5,
  travelers: {
    adults: 2,
    children: 0,
  },
  departureMonth: new Date().toISOString().slice(0, 7), // YYYY-MM
  tripType: "Couple",

  budget: 1500,
  budgetCategory: "Comfort",

  accommodation: "Standard Hotel",
  activityPrefs: [],
  transportPref: "Mixed",
  switches: {
    includeActivities: true,
    includeLocalTransport: true,
    includeFood: true,
  },
};

export interface ApiTripResult {
  destination: { city: string; country: string; costTier: string; };
  input: { budget: number; days: number; travelers: number; };
  breakdown: { flightCost: number; hotelCost: number; foodCost: number; transportCost: number; activitiesCost: number; };
  totalCost: number;
  remainingBudget: number;
  isBudgetEnough: boolean;
  budgetUsedPercentage: number;
}

export interface DestinationData {
  slug: string;
  city: string;
  country: string;
  roundTripFlightCostUSD: number;
  hotelCostPerNightUSD: number;
  foodCostPerPersonPerDayUSD: number;
  localTransportCostPerPersonPerDayUSD: number;
  activitiesCostPerPersonPerDayUSD: number;
}
