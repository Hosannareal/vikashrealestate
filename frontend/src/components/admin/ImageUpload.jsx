import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

const ImageUpload = ({ images = [], setImages }) => {
  const [isDragging, setIsDragging] = useState(false);

  // In a real app we would upload these to S3 or similar and keep URLs.
  // For demo, we are simulating a URL output.
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    
    // Simulate image read logic:
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setImages(prev => [...prev, url]);
    });
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setImages(prev => [...prev, url]);
    });
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full min-h-[160px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors duration-200 
          ${isDragging ? 'bg-[#FDFCFB] border-[#C6A769]' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => document.getElementById('image-upload').click()}
      >
        <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
        <span className="text-sm font-medium text-gray-700">Drag & drop your images here</span>
        <span className="text-xs text-gray-500 mt-1">or click to browse from your computer</span>
        <input 
          id="image-upload" 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          onChange={handleChange} 
        />
      </div>

      {images.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <div key={i} className="relative group w-24 h-24 shrink-0 rounded-md overflow-hidden border border-gray-200">
              <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); removeImage(i); }} 
                className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-sm"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
