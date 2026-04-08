const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: true },
  unit: { type: String, required: true, enum: ['Sq.ft', 'Sq.yd', 'Acre', 'Hectare'] },
  landType: { type: String, required: true, enum: ['Residential Plot', 'Agricultural Land', 'Farm Land', 'Industrial Land'] },
  features: {
    roadAccess: { type: Boolean, default: false },
    cornerPlot: { type: Boolean, default: false },
    electricity: { type: Boolean, default: false },
    water: { type: Boolean, default: false }
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
}, { timestamps: true });

// Create text index for search
landSchema.index({ title: 'text', location: 'text', city: 'text' });

const Land = mongoose.model('Land', landSchema);

module.exports = Land;