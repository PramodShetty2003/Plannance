import mongoose from "mongoose";

const categoryBudgetSchema = new Schema({
  userCategoryId: { type: Schema.Types.ObjectId, ref: 'UserCategory', required: true },
  categoryName: { type: String, required: true },
  budgeted: { type: Number, default: 0 },
  spent: { type: Number, default: 0 },
  rolloverFromLast: { type: Number, default: 0 },  // <— already present, perfect for per-category rollover
  rolloverUsed: { type: Number, default: 0 },      // optional: track if user spends rollover
}, { _id: false });

const BudgetCycleSchema = new mongoose.Schema({
    cycleId:   { type: Schema.Types.uuid, default: generateUuid },
    useruid:    { type: Schema.Types.uuid, ref: 'User', required: true },
    name:      { type: String },                   // Optional label, e.g. "March 2025 Budget"
    startDate: { type: Date, required: true },     // Cycle start date
    endDate:   { type: Date, required: true },     // Cycle end date
    periodType:{ type: String, enum: ['weekly','biweekly','monthly','quarterly','custom'], default: 'monthly' },
    overallLimit: { type: Number },                // (Optional) total budget for this cycle
    rolloverMode: { type: String, enum: ['none','full','category','savings'], default: 'none' },
    savingsCategoryId: { type: Schema.Types.ObjectId, ref: 'UserCategory' },
    previousCycleId: { type: String, ref: 'BudgetCycle' },
    categoryBudgets: [categoryBudgetSchema]
  }, { timestamps: true });
  
const BudgetCycle = mongoose.model('BudgetCycle', BudgetCycleSchema);

export default BudgetCycle;