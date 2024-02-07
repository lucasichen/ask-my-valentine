import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ImageUpload = ({ openModal, setOpenModal, handleImageUpload, handleSelectDefaultGif, isMobile, baseGif }) => {
  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload from your computer or choose our default gif.
        </DialogContentText>
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          onChange={handleImageUpload}
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
        <Button variant="contained" onClick={() => handleSelectDefaultGif(baseGif)}>
          Default GIF
        </Button>
        {/* Add logic to handle default gif selection */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageUpload;