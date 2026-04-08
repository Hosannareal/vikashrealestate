const express = require('express');
const Property = require('../models/property');
const router = express.Router();

// GET all properties
router.get('/', async (req, res) => {
    try {
        const { type, location, minPrice, maxPrice, bhk } = req.query;
        let query = {};
        
        if (type) query.type = new RegExp(type, 'i');
        if (location) query.location = new RegExp(location, 'i');
        if (bhk) query.bhk = bhk;
        // Basic filtering, typically price filtering requires proper Number schemas
        
        const properties = await Property.find(query);
        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET single property by id
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;