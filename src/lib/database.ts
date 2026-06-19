import mongoose from "mongoose";

export async function dbConnect () {
    const url = process.env.DATABASE_URL;

    if(!url) {
        throw new Error("DATABASE_URL is not defined");
    }

    try{
        console.log("Connecting to MongoDB...");
        const conn = await mongoose.connect(url);
        console.log("Database connected successfully:", conn.connection.host);
    }
    catch(error) {
       console.error("Error in database connection:", error);
       throw error; 
    }
}