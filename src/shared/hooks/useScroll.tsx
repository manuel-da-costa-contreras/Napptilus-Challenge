import { useEffect, useState } from 'react';

export const useScroll = () => {
  const [scroll, setScroll] = useState({
    y: document.body.getBoundingClientRect().top,
    direction: '',
  });

  const listener = (e) => {
    setScroll((prev) => ({
      y: -document.body.getBoundingClientRect().top,
      direction:
        prev.y > -document.body.getBoundingClientRect().top ? 'up' : 'down',
    }));
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);

  return scroll;
};
