import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../modules/admin/admin.model.js';

dotenv.config();

const DEFAULT_ADMIN = {
  username: process.env.ADMIN_USERNAME || 'your_username',
  password: process.env.ADMIN_PASSWORD || 'your_secure_password'
};

async function createAdmin() {
  
try {
    await mongoose.connect(process.env.MONGODBATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });


   const existingAdmin = await Admin.findOne({ username: DEFAULT_ADMIN.username });
    if (existingAdmin) {
     
      process.exit(0);
    }

    
    const admin = new Admin(DEFAULT_ADMIN);
    await admin.save();



    process.exit(0);
  } catch (error) {

    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin();
