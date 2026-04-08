const fs = require('fs');
const content = import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash2, Search, CheckSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { mockLandProperties } from '../../data/mockLand'; // Used for active/sold plots

const initialForm = {
  name: '',
  phone: '',
  email: '',
  image: '',
  cities: [],
  specializations: [],
  experience_years: '',
  total_sold: 0,
  active_listings: 0,
  bio: '',
  status: 'Active',
  active_plots: [],
  sold_plots: []
};

// ... component logic ...;
