import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { baseGif } from '../../constants';
import { styles } from './customValentine.style';
import { useWillYouBe } from '../../hooks/useWillYouBe';
import { useCustomValentine } from '../../hooks/useCustomValentine';

const CustomValentine = () => {
  const { isYesPressed, handleYesClick, handleNoClick, handleYesButtonSize, getNoPhrase } = useWillYouBe();
  const { loading, valentine } = useCustomValentine();
  const name = valentine?.name;
  const gif1 = valentine?.gif1;
  const gif2 = valentine?.gif2;
  console.log(gif1, gif2);
  const theme = useTheme();
  const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));

  return (
    <>
      {isYesPressed ? (
        <Box className="mine-now" sx={styles.container}>
          <Typography align="center" variant="h3">I'll see you on Valentine's day!</Typography>
          <Box component="img" sx={{ width: 300 }} src={`data:image/*;base64,${gif2}`} alt="I see on Valentine's day!" />
        </Box >
      ) : (
        loading ? ("loading") : (
          <Box sx={styles.container} className="will-you-be-my-valentine">
            <img height="300vh" src={`data:image/*;base64,${gif1}`} alt="Will you be my Valentine?" />
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
              >
                Yes
              </Button>
              <Button variant="contained" color="error" onClick={handleNoClick}>
                {getNoPhrase()}
              </Button>
            </Box>
          </Box>
        )
      )}
    </>
  );
}

export default CustomValentine;
