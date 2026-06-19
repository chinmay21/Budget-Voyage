import Destination from "@/model/Destination";
import { dbConnect } from "@/lib/database";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_req: NextRequest, {params}: {params: Promise<{slug: string}>}) {
    try{
        await dbConnect();
        const { slug } = await params;
        console.log(params);
        const destination = await Destination.findOne({ slug: slug });
        
        if (!destination) {
            return NextResponse.json(
                {
                success: false,
                message: "Destination not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success:true,
            data: destination,
            message: "Destination fetched successfully"
        }, {status: 200});
    }
    catch(error) {
        console.log("Error which fetching destination", error);
        return NextResponse.json({
            success: false,
            message: "Unable to fetch destination"
        }, {status: 500});
    }
}