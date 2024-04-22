import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  jobnumber: { type: String, select: false },
  userID: String,
  billable: String,
  serviceproviderid: String,
  referncenumber: String,
  }, 
  
);

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);