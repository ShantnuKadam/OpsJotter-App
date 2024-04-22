import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    name: { type: String, select: false },
    email: String,
    password: String,
  }, 
  
);

export default mongoose.models.Account || mongoose.model('Account', accountSchema);