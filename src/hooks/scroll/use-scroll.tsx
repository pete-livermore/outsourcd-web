import { useEffect, useState } from 'react';

export function useScroll() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState({ top: 0 });

  const timer = setTimeout(() => {
    setIsScrolling(false);
  }, 300);

  useEffect(() => {
    function handleScroll() {
      setIsScrolling(true);
      const newPosition = window.scrollY;
      setScrollPosition({ top: newPosition });
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [timer]);

  return {
    isScrolling,
    scrollPosition
  };
}
