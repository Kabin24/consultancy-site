import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.model("Destination", destinationSchema);