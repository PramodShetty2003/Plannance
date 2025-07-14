import mongoose from "mongoose";

const UserCategorySchema = new mongoose.Schema({
    useruid: { type: String, ref: 'User', required: true },
    defaultCategoryId: { type: Schema.Types.ObjectId, ref: 'DefaultCategory' },
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true }
  }, { timestamps: true });

const UserCategory = mongoose.model('UserCategory', UserCategorySchema);

export default UserCategory;