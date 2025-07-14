import mongoose from "mongoose";

const defaultCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
},{ timestamps: true });

const DefaultCategory = mongoose.model("DefaultCategory", defaultCategorySchema);

export default DefaultCategory;
