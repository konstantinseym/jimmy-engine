import { useEffect, useRef, useState } from "react";

export function useNavbarVisible({ threshold = 8, showAtTopOffset = 80 } = {}) {
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY.current;

        // Наверху страницы navbar всегда виден
        if (currentScrollY <= showAtTopOffset) {
          setIsVisible(true);
          lastScrollY.current = currentScrollY;
          ticking.current = false;
          return;
        }

        // Игнорируем микродвижения, чтобы не было дерганья
        if (Math.abs(diff) >= threshold) {
          if (diff > 0) {
            // Скролл вниз
            setIsVisible(false);
          } else {
            // Скролл вверх
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
        }

        ticking.current = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, showAtTopOffset]);

  return isVisible;
}
