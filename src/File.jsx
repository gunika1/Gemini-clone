
import React, { useState } from 'react';
import plusIcon from './assets/plus.png'; 

const File = ({ onImageSelect }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      onImageSelect(file);
    }
  };

  return (
    <div className="file-uploader flex items-center p-4 rounded-xl shadow-md">
      <input
        type="file"
        id="file-input"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <label htmlFor="file-input" className="cursor-pointer">
        <img
          src={plusIcon} 
          alt="Upload"
          className="h-6 w-6 filter invert"
        />
      </label>
      {previewUrl && (
        <div className="ml-4">
          <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded-md" />
        </div>
      )}
    </div>
  );
};

export default File;