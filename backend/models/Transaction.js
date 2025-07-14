import mongoose from "mongoose";


const TransactionSchema = new Schema({
  useruid: { type: String, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  description: { type: String },
  userCategoryId: { type: Schema.Types.ObjectId, ref: 'UserCategory' },
  categoryName: { type: String },
  budgetCycleId: { type: Schema.Types.ObjectId, ref: 'BudgetCycle' },
  type: { type: String, enum: ['income','expense'], required: true }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
