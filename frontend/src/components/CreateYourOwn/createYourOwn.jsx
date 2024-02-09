import React, { useState } from 'react'
import { Typography, Box, Button, TextField, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { baseGif } from '../../constants';
import { styles } from './createYourOwn.style';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './components/imageUpload';
import { useValentine } from '../../hooks/useValentine';

const CreateYourOwn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));
  const {
    loading,
    imageStart,
    imageEnd,
    openModalStart,
    openModalEnd,
    isCreateDisabled,
    handleImageUploadStart,
    handleImageUploadEnd,
    handleTextFieldChange,
    handleCreatePressed,
    setOpenModalStart,
    setOpenModalEnd,
  } = useValentine();

  return (
    <Box style={styles.container}>
      <Grid container style={styles.gridContainer}>
        <Grid item xs={12} style={styles.backContainer}>
          <Box style={styles.backContainer}>
            <Button onClick={() => navigate('/')}>Back</Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          // add right border for desktop view
          style={{
            borderRight: isMobile ? 'none' : '1px solid black',
            borderBottom: isMobile ? '1px solid black' : 'none',
            padding: isMobile ? '10px' : '20px',
          }}
        >
          <Box sx={styles.subContainer} className="will-you-be-my-valentine">
            {/* Image upload */}
            {imageStart && <img height="300vh" src={URL.createObjectURL(imageStart)} alt="Will you be my Valentine?" />}
            {/* {selectedStartDefaultGif && <img height="300vh" src={selectedStartDefaultGif} alt="Will you be my Valentine?" />} */}
            <Button variant="contained" onClick={() => setOpenModalStart(true)}>Upload Image</Button>
            <ImageUpload
              openModal={openModalStart}
              setOpenModal={setOpenModalStart}
              handleImageUpload={handleImageUploadStart}
              // handleSelectDefaultGif={handleSelectDefaultGifStart}
              isMobile={isMobile}
            // baseGif={baseGif[0]}
            />
            {/* Text field */}
            {/* <TextField
              id="message"
              label="Your Message"
              variant="outlined"
              margin="normal"
              onChange={(e) => handleTextFieldChange(e.target.value)}
            /> */}

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
                  marginRight: isMobile ? "0" : '10px',
                  marginBottom: isMobile ? "10px" : '0'
                }}
                variant="contained"
              >Yes
              </Button>
              <Button variant="contained" color="error">
                No
              </Button>
            </Box>
          </Box>
        </Grid >
        <Grid item xs={12} md={6}>
          <Box className="mine-now" sx={styles.subContainer}>
            <Typography align="center" variant="h3">See you on Valentine's day!</Typography>
            {/* <Box component="img" sx={{ width: 300 }} src={baseGif[1]} alt="I see on Valentine's day!" /> */}
            {imageEnd && <img height="300vh" src={URL.createObjectURL(imageEnd)} alt="Will you be my Valentine?" />}
            {/* {selectedEndDefaultGif && <img height="300vh" src={selectedEndDefaultGif} alt="Will you be my Valentine?" />} */}
            <Button variant="contained" onClick={() => setOpenModalEnd(true)}>Upload Image</Button>
            <ImageUpload
              openModal={openModalEnd}
              setOpenModal={setOpenModalEnd}
              handleImageUpload={handleImageUploadEnd}
              // handleSelectDefaultGif={handleSelectDefaultGifEnd}
              isMobile={isMobile}
            // baseGif={baseGif[1]}
            />
          </Box >
        </Grid>
        <Grid item xs={12} style={styles.createContainer}>
          <Box >
            {loading ? (
              <Box>Loading...</Box>
            ) :
              (<Button
                variant="contained"
                color="primary"
                onClick={() => handleCreatePressed()}
                disabled={isCreateDisabled}
                fullWidth
              >Create
              </Button>)
            }
          </Box>
        </Grid>
      </Grid >

    </Box>
  )
}

export default CreateYourOwn
