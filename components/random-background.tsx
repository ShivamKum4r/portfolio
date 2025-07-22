
"use client";

import { useEffect, useState } from "react";

const backgroundImages = [
  "/projects/Background/-110060467.jpg",
  "/projects/Background/-1339539109.jpg",
  "/projects/Background/-192197663.jpg",
  "/projects/Background/-2097564059.jpg",
  "/projects/Background/-2122365826.jpg",
  "/projects/Background/-561132732.jpg",
  "/projects/Background/1031369683.jpg",
  "/projects/Background/1430972857.jpg",
  "/projects/Background/1952976201.jpg",
  "/projects/Background/1980636793.jpg",
  "/projects/Background/307320098.jpg",
  "/projects/Background/820862059.jpg",
];

export function RandomBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    // Set initial values
    checkMobile();
    
    // Preload images for smooth transitions
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    
    setIsLoaded(true);

    // Add resize listener for responsive behavior
    window.addEventListener('resize', checkMobile);

    // Change background every 7 seconds with smooth transition
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 500); // Half of transition duration
    }, 7000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [nextImageIndex]);

  if (!isLoaded) return null;

  const baseStyles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: isMobile ? "scroll" : "fixed",
  };

  const mobileOptimizations = isMobile ? {
    transform: "none",
    willChange: "opacity" as const,
  } : {
    transform: "scale(1.02)",
    willChange: "opacity, transform" as const,
  };

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden">
      {/* Current background layer */}
      <div 
        className={`absolute inset-0 opacity-20 dark:opacity-15 transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-20 dark:opacity-15'
        }`}
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          ...baseStyles,
          ...mobileOptimizations,
        }}
      />
      
      {/* Next background layer for smooth transition */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-20 dark:opacity-15' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${backgroundImages[nextImageIndex]})`,
          ...baseStyles,
          ...mobileOptimizations,
        }}
      />

      {/* Mobile performance overlay */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
