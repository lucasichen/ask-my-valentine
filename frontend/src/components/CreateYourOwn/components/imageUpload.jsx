import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ImageUpload = ({ openModal, setOpenModal, handleImageUpload, isMobile }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={dragging ? { border: '2px dashed #aaa', borderRadius: '5px', padding: '20px' } : {}}
      >
        <DialogContentText>
          Upload from your computer or drag image here.
        </DialogContentText>
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          style={{ display: 'none' }}
        />
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            style={{
              marginRight: isMobile ? "0" : '10px',
              marginBottom: isMobile ? "10px" : '0'
            }}
          >
            Upload from Computer
          </Button>
        </label>
        {/* <Button variant="contained" onClick={() => handleSelectDefaultGif(baseGif)}>
          Default GIF
        </Button> */}
        {/* Add logic to handle default gif selection */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageUpload;
