import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
      const handleStorageChange = (e) => {
        if (e.key == key && e.newValue !== null) {
          try{
            const newValue = JSON.parse(e.newValue);
            setValue(newValue)
          } catch (error) {
            console.error(error, 'Error pasing storage event for key')
          }
        }
      }

      window.addEventListener('storage',handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange)
    },[key])

  return [value, setValue];
};