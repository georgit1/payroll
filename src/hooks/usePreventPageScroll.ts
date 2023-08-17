// NOTE not in use

import { useEffect } from 'react';

const usePreventPageScroll = (preventScroll: boolean) => {
  console.log(preventScroll);
  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (preventScroll) {
        event.preventDefault();
      }
    };

    if (preventScroll) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', handleScroll);
    } else {
      document.body.style.overflow = ''; // Reset to default value
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      document.body.style.overflow = ''; // Reset to default value when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, [preventScroll]);
};

export default usePreventPageScroll;
