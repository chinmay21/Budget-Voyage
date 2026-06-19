type DestinationCost = {
  roundTripFlightCostUSD: number;
  hotelCostPerNightUSD: number;
  foodCostPerPersonPerDayUSD: number;
  localTransportCostPerPersonPerDayUSD: number;
  activitiesCostPerPersonPerDayUSD: number;
}

export function calculateTrip(
    destination: DestinationCost,
    budget: number,
    days: number,
    travelers: number
) {
    const flightCost = destination.roundTripFlightCostUSD * travelers;

    const hotelCost = destination.hotelCostPerNightUSD * days;

    const foodCost = destination.foodCostPerPersonPerDayUSD * days * travelers;

    const transportCost = destination.localTransportCostPerPersonPerDayUSD * days * travelers;

    const activitiesCost = destination.activitiesCostPerPersonPerDayUSD * days * travelers;

    const totalCost = flightCost + hotelCost + foodCost + transportCost + activitiesCost;

    const remainingBudget = budget - totalCost;

    const isBudgetEnough = remainingBudget >= 0;

    const budgetUsedPercentage = (totalCost / budget) * 100;

    return {
        flightCost,
        hotelCost,
        foodCost, 
        transportCost, 
        activitiesCost, 
        totalCost, 
        remainingBudget, 
        isBudgetEnough, 
        budgetUsedPercentage
    };
}