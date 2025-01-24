import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const coonection = mongoose.connection;
        coonection.on("connected", () => {
            console.log("Database Connection Successfull");
        })
        coonection.on("error", (err) => {
            console.log("Database Connection Failed", err);;
            process.exit();
        })
    } catch (error) {
        console.log("Database Connection Failed", error);
    }
}