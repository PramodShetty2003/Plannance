// models/MonthlyRecord.js
import mongoose from 'mongoose';                                              
import { generateUuid } from '../utils/uuid.js';


const monthlyCategorySchema = new mongoose.Schema({
  userCategoryId: { type: Schema.Types.ObjectId, ref: 'UserCategory', required: true },
  categoryName: { type: String, required: true },
  budgeted: { type: Number, default: 0 },
  spent: { type: Number, default: 0 },
  rollover: { type: Number, default: 0 }
}, { _id: false });

const monthlyRecordSchema = new mongoose.Schema({
  recordUuid: { type: String, default: generateUuid, unique: true },
  useruid: { type: String, ref: 'User', required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  totalIncome: { type: Number, default: 0 },
  totalExpense: { type: Number, default: 0 },
  netSavings: { type: Number, default: 0 },
  isFinalized: { type: Boolean, default: false },
  categories: [monthlyCategorySchema]
}, { timestamps: true });

const MonthlyRecord = mongoose.model('MonthlyRecord', monthlyRecordSchema);

export default MonthlyRecord;