import { useEffect } from 'react';

const ScrollToTop = () => {
  const fullpath = window.location.href;
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [fullpath]);

  return null;
};

export default ScrollToTop;
