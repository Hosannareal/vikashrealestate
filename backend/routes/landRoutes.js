const express = require('express');
const Land = require('../models/land');
const router = express.Router();

// GET /api/lands/search
router.get('/search', async (req, res) => {
    try {
        const { 
            location, minPrice, maxPrice, minSize, maxSize, 
            unit, landType, roadAccess, cornerPlot, electricity, water,
            page = 1, limit = 10, sort = '-createdAt'
        } = req.query;

        let query = {};

        // Text Search on location/city/title
        if (location) {
            query.$text = { $search: location };
        }

        // Price Filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Size Filter
        if (minSize || maxSize) {
            query.size = {};
            if (minSize) query.size.$gte = Number(minSize);
            if (maxSize) query.size.$lte = Number(maxSize);
        }

        // Exact Matches
        if (unit) query.unit = unit;
        if (landType) query.landType = landType;

        // Boolean Filters
        if (roadAccess === 'true') query['features.roadAccess'] = true;
        if (cornerPlot === 'true') query['features.cornerPlot'] = true;
        if (electricity === 'true') query['features.electricity'] = true;
        if (water === 'true') query['features.water'] = true;

        // Sorting
        let sortOption = {};
        if (sort === 'priceAsc') sortOption.price = 1;
        else if (sort === 'priceDesc') sortOption.price = -1;
        else if (sort === 'newest') sortOption.createdAt = -1;
        else sortOption.createdAt = -1;

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);

        const lands = await Land.find(query)
                                .sort(sortOption)
                                .skip(skip)
                                .limit(Number(limit));
        
        const total = await Land.countDocuments(query);

        res.json({
            success: true,
            count: lands.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            data: lands
        });
    } catch (error) {
        console.error('Error fetching lands:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

module.exports = router;