import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { baseGif } from '../../constants';
import { styles } from './askMyValentine.style';

const AskMyValentine = ({ handleCreatePressed, handleTemplatePressed }) => {
  return (
    <Box style={styles.container}>
      <img height="300vh" src={baseGif[0]} alt="Will you be my Valentine?" />
      <Typography variant="h3">Welcome to Ask My Valentine 💘</Typography>
      <Typography variant="h5">Create your own valentine message</Typography>
      <Box style={styles.buttonContainer}>
        <Button variant="contained" color="primary" style={styles.createButton} onClick={handleCreatePressed}>Create Your Own</Button>
        <Button variant="contained" color="success" onClick={handleTemplatePressed}>Use mine</Button>
      </Box>
    </Box >
  )
}

export default AskMyValentine