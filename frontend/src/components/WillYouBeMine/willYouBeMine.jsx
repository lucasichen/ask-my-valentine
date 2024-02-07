import React, { useState } from 'react'
import { Typography, Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { phrases, baseGif } from '../../constants';
import { styles } from './willYouBeMine.style';

const WillYouBeMine = ({ name, gif1, endGif }) => {
  const [noCount, setNoCount] = useState(0);
  const [isYesPressed, setIsYesPressed] = useState(false);
  const theme = useTheme();
  const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));

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
    <>
      {
        isYesPressed ? (
          <Box className="mine-now" sx={styles.container}>
            <Typography align="center" variant="h3">I see on Valentine's day!</Typography>
            <Box component="img" sx={{ width: 300 }} src={endGif || baseGif[1]} alt="I see on Valentine's day!" />
          </Box >
        ) : (
          <Box sx={styles.container} className="will-you-be-my-valentine">
            <img height="300vh" src={gif1 || baseGif[0]} alt="Will you be my Valentine?" />
            {name && <Typography align="center" variant="h4">Dear {name},</Typography>}
            <Typography align="center" variant="h3">Will you be my Valentine?</Typography>
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
                  marginRight: isMobile ? "0" : '10px',
                  marginBottom: isMobile ? "10px" : '0'
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
    </>

  )
}

export default WillYouBeMine