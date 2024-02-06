import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { useTheme } from '@mui/material/styles';
import { AskMyValentine } from '../components/AskMyValentine';
import { WillYouBeMine } from '../components/WillYouBeMine';

const MyValentine = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useHistory
  const [isCreatePressed, setIsCreatePressed] = useState(false);
  const [isTemplatePressed, setIsTemplatePressed] = useState(false);

  const handleCreatePressed = () => {
    setIsCreatePressed(true);
  }

  const handleUseOursPressed = () => {
    setIsTemplatePressed(true);
    // Update the URL when template button is pressed
    navigate('/will-you-be-my-valetine');
  }

  return (
    <Box>
      {!isTemplatePressed ? <AskMyValentine handleCreatePressed={handleCreatePressed} handleTemplatePressed={handleUseOursPressed} /> : <WillYouBeMine />}
    </Box >
  )
}

export default MyValentine;
