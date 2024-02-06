import React, { useState } from 'react'
import { Typography, Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { phrases, baseGif } from '../constants';
import { styles } from './willYouBeMine.style';

const WillYouBeMine = () => {
  const [noCount, setNoCount] = useState(0);
  const [isYesPressed, setIsYesPressed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));

  const handleYesClick = () => {
    setIsYesPressed(true);
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    console.log(noCount);
  }

  const handleYesButtonSize = () => {
    if (isMobile) {
      return Math.min(80, noCount * 10 + 14);
    }
    return noCount * 10 + 14;
  }

  const getNoPhrase = () => {
    return phrases[noCount % phrases.length];
  }

  return (
    <Box style={styles.container}>
      {
        isYesPressed ? (
          <Box>
            <Typography variant="h3">I see on Valentine's day!</Typography>
            <img height="300vh" src={baseGif[1]} alt="I love you!" />
          </Box >
        ) : (
          <Box>
            <img height="300vh" src={baseGif[0]} alt="Will you be my Valentine?" />
            <Typography variant="h3">Will you be my Valentine?</Typography>
            <Box
              style={{
                ...styles.buttonContainer,
                flexDirection: isMobile ? 'column' : 'row',
              }}
            >
              <Button
                style={{
                  ...styles.yesButton,
                  fontSize: `${handleYesButtonSize()}px`,
                }}
                onClick={handleYesClick}
                variant="contained"
              >Yes
              </Button>
              <Button variant="contained" color="error" onClick={handleNoClick}>
                {getNoPhrase()}
              </Button>
            </Box>
          </Box>
        )}
    </Box >

  )
}

export default WillYouBeMine