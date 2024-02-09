import axios from 'axios';

export const getValentine = async (valentineId) => {
  const response = await axios.get(process.env.REACT_APP_VALENTINE_API + `api/get-valentine/${valentineId}`);
  const data = await response.data;
  return data
}

export const saveValentine = async (payload) => {
  const response = await axios.post(process.env.REACT_APP_VALENTINE_API + 'api/save', payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  const data = await response.data;
  return data;
}