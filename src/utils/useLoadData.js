import { useState, useCallback } from 'react';

export function useLoadData() {
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');

  const sendRequest = useCallback(async (url) => {
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data from the server.');
      }

      const data = await response.json();
      setStatus('success');

      return data;
    } catch (error) {
      console.error('Hook Error:', error);

      setStatus('error');
      setErrorMsg(error.message || 'Something went wrong.');

      throw error;
    }
  }, []);

  return { status, errorMsg, sendRequest };
}
