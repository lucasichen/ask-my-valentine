import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AskMyValentine } from '../components/AskMyValentine';
import { WillYouBeMine } from '../components/WillYouBeMine';
import { CreateYourOwn } from '../components/CreateYourOwn';

const MyValentine = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useHistory
  const [isCreatePressed, setIsCreatePressed] = useState(false);
  const [isTemplatePressed, setIsTemplatePressed] = useState(false);

  const handleCreatePressed = () => {
    setIsCreatePressed(true);
    navigate('/create-your-own'); // Update the URL when create button is pressed
  }

  const handleUseOursPressed = () => {
    setIsTemplatePressed(true);
    // Update the URL when template button is pressed
    navigate('/will-you-be-my-valentine');
  }

  return (
    <Box>
      {!isTemplatePressed ? <AskMyValentine handleCreatePressed={handleCreatePressed} handleTemplatePressed={handleUseOursPressed} /> : <WillYouBeMine />}
    </Box >
  )
}

export default MyValentine;
