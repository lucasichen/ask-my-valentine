import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { baseGif } from '../../constants';
import { styles } from './willYouBeMine.style';
import { useWillYouBe } from '../../hooks/useWillYouBe';

const WillYouBeMine = () => {
  const { isYesPressed, handleYesClick, handleNoClick, handleYesButtonSize, getNoPhrase } = useWillYouBe();
  const theme = useTheme();
  const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));

  return (
    <>
      {
        isYesPressed ? (
          <Box className="mine-now" sx={styles.container}>
            <Typography align="center" variant="h3">I'll see you on Valentine's day!</Typography>
            <Box component="img" sx={{ width: 300 }} src={baseGif[1]} alt="I see on Valentine's day!" />
          </Box >
        ) : (
          <Box sx={styles.container} className="will-you-be-my-valentine">
            <img height="300vh" src={baseGif[0]} alt="Will you be my Valentine?" />
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