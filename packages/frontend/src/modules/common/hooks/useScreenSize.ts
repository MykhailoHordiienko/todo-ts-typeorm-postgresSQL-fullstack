import { useState, useEffect } from 'react';

const initialScreen =
  window.innerWidth < 426 ? 'mobile' : window.innerWidth < 768 ? 'tablet' : 'desktop';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(() => initialScreen);

  useEffect(() => {
    const handleResize = () => {
      const screen =
        window.innerWidth < 426 ? 'mobile' : window.innerWidth < 768 ? 'tablet' : 'desktop';
      setScreenSize(screen);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
