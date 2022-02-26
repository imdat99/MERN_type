import mongoose from "mongoose";

const URI: string = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jagsx.mongodb.net/appChat?retryWrites=true&w=majority`
const connectDB = async () => {
    try {
        await mongoose.connect(
            URI
        );
        console.log("connected");
    } catch (err) {
        console.log(`err: ${err}`);
        process.exit(1);
    }
}
connectDB()