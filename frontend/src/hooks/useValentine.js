import { useState, useEffect, useCallback } from 'react';
import { saveValentine, getValentine } from '../service/valentines';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
// const fs = require('fs');

export const useValentine = () => {
  const [valentine, setValentine] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { docID } = useParams();
  console.log(docID);

  const [imageStart, setImageStart] = useState(null); // State to hold the uploaded image
  const [imageEnd, setImageEnd] = useState(null); // State to hold the uploaded image
  const [openModalStart, setOpenModalStart] = useState(false); // State to control the modal
  const [openModalEnd, setOpenModalEnd] = useState(false); // State to control the modal
  const [selectedStartDefaultGif, setselectedStartDefaultGif] = useState(null); // State to hold the selected default gif
  const [selectedEndDefaultGif, setselectedEndDefaultGif] = useState(null); // State to hold the selected default gif
  const [textFieldValue, setTextFieldValue] = useState(''); // State to hold the text field value
  const isCreateDisabled = (imageStart == null & selectedStartDefaultGif == null) | (imageEnd == null & selectedEndDefaultGif == null);

  // Function to handle image upload
  const handleImageUploadStart = (file) => {
    // const file = e.target.files[0];
    setselectedStartDefaultGif(null); // Reset the selected default gif
    setImageStart(file);
    setOpenModalStart(false); // Close the modal after image upload
  }

  // Function to handle selection of default gif
  const handleSelectDefaultGifStart = (gif) => {
    setImageStart(null); // Reset the image state
    setselectedStartDefaultGif(gif);
    setOpenModalStart(false); // Close the modal after selecting the default gif
  }

  const handleImageUploadEnd = (file) => {
    // const file = e.target.files[0];
    setselectedEndDefaultGif(null); // Reset the selected default gif
    setImageEnd(file);
    setOpenModalEnd(false); // Close the modal after image upload
  }

  const handleSelectDefaultGifEnd = (gif) => {
    setImageStart(null); // Reset the image state
    setselectedEndDefaultGif(gif);
    setOpenModalEnd(false); // Close the modal after selecting the default gif
  }

  // Function to handle text field value
  const handleTextFieldChange = (value) => {
    setTextFieldValue(value);
  }

  const handleCreatePressed = () => {
    console.log(textFieldValue, imageStart, imageEnd);
    // check if the user has uploaded an image or selected a default gif
    const formData = new FormData();
    if (textFieldValue) {
      formData.append('name', textFieldValue);
    }
    if (imageStart && imageEnd) {
      formData.append('files', imageStart);
      formData.append('files', imageEnd);
    }
    createValentine(formData);
  }

  const fetchValentine = useCallback(async (docID) => {
    setLoading(true);
    try {
      const response = await getValentine(docID);
      setValentine(response);
    } catch (err) {
      enqueueSnackbar('Sowwy, error getting your valentine :(', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const createValentine = useCallback(async (payload) => {
    setLoading(true);
    try {
      const response = await saveValentine(payload);
      setValentine(response);
      enqueueSnackbar('Valentine created successfully!', { variant: 'success' });
      navigate(`/valentine/${response.valentineId}`, { valentineId: response.valentineId });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Sowwy, error creating your valentine :(', { variant: 'error' });
    } finally {
      setLoading(false);
    }

  }, [valentine, enqueueSnackbar]);

  useEffect(() => {
    if (docID) {
      fetchValentine(docID);
    }
  }, [docID]);

  return {
    valentine,
    loading,
    imageStart,
    imageEnd,
    openModalStart,
    openModalEnd,
    selectedStartDefaultGif,
    selectedEndDefaultGif,
    textFieldValue,
    isCreateDisabled,
    handleImageUploadStart,
    handleSelectDefaultGifStart,
    handleImageUploadEnd,
    handleSelectDefaultGifEnd,
    handleTextFieldChange,
    handleCreatePressed,
    setOpenModalStart,
    setOpenModalEnd,
    fetchValentine,
    createValentine,
  };
};