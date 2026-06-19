import { dbConnect } from "@/lib/database";
import Destination from "@/model/Destination";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { calculateTrip } from "@/utils/calculateTrip";

export async function POST(req: NextRequest) {
    try {
        const { slug, budget, days, travelers } = await req.json();

        // --- Validation ---
        if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
            return NextResponse.json(
                { success: false, message: "slug must be a non-empty string" },
                { status: 400 }
            );
        }

        if (typeof budget !== "number" || budget <= 0) {
            return NextResponse.json(
                { success: false, message: "budget must be a number greater than 0" },
                { status: 400 }
            );
        }

        if (typeof days !== "number" || days <= 0) {
            return NextResponse.json(
                { success: false, message: "days must be a number greater than 0" },
                { status: 400 }
            );
        }

        if (typeof travelers !== "number" || travelers <= 0) {
            return NextResponse.json(
                { success: false, message: "travelers must be a number greater than 0" },
                { status: 400 }
            );
        }

        // --- Database ---
        await dbConnect();

        const destination = await Destination.findOne({ slug });

        if (!destination) {
            return NextResponse.json(
                { success: false, message: `Destination not found for slug: "${slug}"` },
                { status: 404 }
            );
        }

        // --- Calculate ---
        const tripSummary = calculateTrip(destination, budget, days, travelers);

        // --- Response ---
        return NextResponse.json({
            success: true,
            data: {
                destination: {
                    city: destination.city,
                    country: destination.country,
                    costTier: destination.costTier,
                },
                input: { budget, days, travelers },
                breakdown: {
                    flightCost: tripSummary.flightCost,
                    hotelCost: tripSummary.hotelCost,
                    foodCost: tripSummary.foodCost,
                    transportCost: tripSummary.transportCost,
                    activitiesCost: tripSummary.activitiesCost,
                },
                totalCost: tripSummary.totalCost,
                remainingBudget: tripSummary.remainingBudget,
                isBudgetEnough: tripSummary.isBudgetEnough,
                budgetUsedPercentage:
                    Math.round(tripSummary.budgetUsedPercentage * 100) / 100,
            },
        });
    } catch (error) {
        console.error("Trip calculation error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}