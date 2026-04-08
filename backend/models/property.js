const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true }, // Ideally Number, storing as string matching UI design
  status: { type: String, default: 'Ready to Move' },
  description: { type: String, required: true },
  bhk: { type: String, required: true },
  bathrooms: { type: Number },
  sqft: { type: String, required: true },
  parking: { type: Number, default: 1 },
  type: { type: String, required: true, enum: ['Apartment', 'Villa', 'Plot', 'Commercial', 'Apartment/Flat'] },
  furnishing: { type: String, default: 'Semi-Furnished' },
  amenities: [{ type: String }],
  images: [{ type: String }], // Array of image URLs
  imageUrl: { type: String }, // Primary Image
  verified: { type: Boolean, default: false },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;