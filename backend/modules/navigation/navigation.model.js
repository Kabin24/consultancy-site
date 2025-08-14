import mongoose from 'mongoose';

const navigationItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NavigationItem',
    default: null
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NavigationItem'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isDropdown: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const NavigationItem = mongoose.model('NavigationItem', navigationItemSchema);

export default NavigationItem;