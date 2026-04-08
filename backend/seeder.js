require('dotenv').config();
const { checkDbConnection } = require('./config/db');
const Property = require('./models/property');

const mockData = [
  {
    title: 'Luxury 3 BHK Flat in Downtown Boulevard',
    location: 'Downtown Boulevard, City Center',
    price: '₹ 2.5 Cr',
    status: 'Ready to Move',
    description: 'Experience unparalleled luxury in this exquisite 3 BHK apartment located in the heart of the city.',
    bhk: '3',
    bathrooms: 3,
    sqft: '1800',
    parking: 2,
    type: 'Apartment',
    furnishing: 'Fully Furnished',
    imageUrl: '/assets/images/project-banner1.jpg',
    images: ['/assets/images/project-banner1.jpg', '/assets/images/project1.jpg'],
    amenities: ['Swimming Pool', 'Gymnasium', 'Club House'],
    verified: true,
  },
  {
    title: 'Modern 4 BHK Villa',
    location: 'Greenwood Estate',
    price: '₹ 5.2 Cr',
    status: 'Ready to Move',
    description: 'A sprawling 4 BHK villa sitting in the lush greenery of Greenwood Estate. Enjoy the tranquility of nature.',
    bhk: '4',
    bathrooms: 4,
    sqft: '3200',
    parking: 3,
    type: 'Villa',
    furnishing: 'Semi-Furnished',
    imageUrl: '/assets/images/project-banner1.jpg',
    images: ['/assets/images/project-banner1.jpg', '/assets/images/project1.jpg'],
    amenities: ['Private Garden', 'Security', 'Club House'],
    verified: true,
  },
  {
    title: 'Premium Office Space',
    location: 'Business Bay',
    price: '₹ 1.8 Cr',
    status: 'Under Construction',
    description: 'Establish your business in the prestigious Business Bay. Prime location for a premium office space.',
    bhk: 'N/A',
    bathrooms: 2,
    sqft: '1500',
    parking: 5,
    type: 'Commercial',
    furnishing: 'Unfurnished',
    imageUrl: '/assets/images/project1.jpg',
    images: ['/assets/images/project1.jpg'],
    amenities: ['Conference Room', 'Power Backup', 'Cafeteria'],
    verified: false,
  }
];

const importData = async () => {
  try {
    await checkDbConnection();
    await Property.deleteMany();
    await Property.insertMany(mockData);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();