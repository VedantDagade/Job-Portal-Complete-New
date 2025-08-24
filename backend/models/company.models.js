import mongoose from "mongoose";

const companySchema = new mongoose({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },
  website: {
    type: String,
    
  },
  location: {
    type: String,
    
  },
  logo: {
    type: String,           //url to 
    
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

},{ timestamps: true });

export const company = mongoose.model("Company", companySchema);
