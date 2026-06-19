import Destination from "@/model/Destination";
import { dbConnect } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await dbConnect();

        const destinations = await Destination.find({}, "city country slug");

        return NextResponse.json({
            success: true,
            destinations
        }, {status: 200});
    }
    catch(error) {
        console.log("Error while fetching destination details:", error);
        return NextResponse.json({
            success: false,
            message: "Unable to GET destinations detail"
        }, {status: 500});
    }
}