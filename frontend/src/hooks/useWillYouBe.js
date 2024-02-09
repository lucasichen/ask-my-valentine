import { useState } from 'react';
import { phrases } from '../constants';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useWillYouBe = () => {
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

  return {
    noCount,
    isYesPressed,
    handleYesClick,
    handleNoClick,
    handleYesButtonSize,
    getNoPhrase
  }
};