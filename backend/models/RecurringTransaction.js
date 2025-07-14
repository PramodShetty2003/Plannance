import mongoose from "mongoose";


const RecurringTransactionSchema = new Schema({
  useruid: { type: String, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  userCategoryId: { type: Schema.Types.ObjectId, ref: 'UserCategory' },
  categoryName: { type: String },
  frequency: { type: String, enum: ['daily','weekly','biweekly','monthly','yearly'], required: true },
  startDate: { type: Date, default: Date.now },
  nextDue: { type: Date },
  lastProcessed: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const RecurringTransaction = mongoose.model('RecurringTransaction', RecurringTransactionSchema);

export default RecurringTransaction;