import { useState, useEffect, useCallback } from 'react';
import { getValentine } from '../service/valentines';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';

export const useCustomValentine = () => {
  const [valentine, setValentine] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { valetineId } = useParams();

  const fetchValentine = useCallback(async (valetineId) => {
    setLoading(true);
    try {
      let response = await getValentine(valetineId);
      setValentine(response);
    } catch (err) {
      enqueueSnackbar('Sowwy, error getting your valentine :(', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (valetineId) {
      fetchValentine(valetineId);
    }
  }, [valetineId]);

  return {
    valentine,
    loading,
    fetchValentine,
  };
};