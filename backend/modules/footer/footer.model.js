import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
    text: { type: String, required: true },
    link: { type: String },
}, { timestamps: true })

const Footer = mongoose.model("Footer", footerSchema);

export default Footer