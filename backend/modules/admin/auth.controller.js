import jwt from 'jsonwebtoken';
import Admin from './admin.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1d';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password'
      });
    }



    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {

      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }



    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const verifyToken = (req, res) => {

  res.json({ valid: true });
};
