import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  firstName: { type: String, select: false },
  middleName: String,
  lastName: String,
  suffix: String,
  customerDisplayName: String,
  companyName: String,
  email: String,
  phone: String,
  fax: String,
  abnNumber: String,
  streetAddress1: String,
  streetAddress2: String,
  city: String,
  state: String,
  postCode: String,
  country: String,
  }, 
  
);

export default mongoose.models.Client || mongoose.model('Client', clientSchema);