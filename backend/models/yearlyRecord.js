import mongoose from 'mongoose';
import { generateUuid } from '../utils/uuid.js';

const yearlyCategorySchema = new mongoose.Schema({
  userCategoryId: { type: Schema.Types.ObjectId, ref: 'UserCategory', required: true },
  categoryName: { type: String, required: true },
  budgeted: { type: Number, default: 0 },
  spent: { type: Number, default: 0 }
}, { _id: false });

const yearlyBudgetSchema = new mongoose.Schema({
  budgetUuid: { type: String, default: generateUuid, unique: true },
  useruid: { type: String, ref: 'User', required: true },
  year: { type: Number, required: true },
  totalBudget: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  netSavings: { type: Number, default: 0 },
  goalSavings: { type: Number },
  categories: [yearlyCategorySchema]
}, { timestamps: true });

const YearlyBudget = mongoose.model('YearlyBudget', yearlyBudgetSchema);

export default YearlyBudget;