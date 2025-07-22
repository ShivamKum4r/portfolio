
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
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Set initial random background
    const getRandomImage = () => {
      return backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    };
    
    setBackgroundImage(getRandomImage());

    // Change background every 7 seconds
    const interval = setInterval(() => {
      setBackgroundImage(getRandomImage());
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[-1] w-screen h-screen opacity-10 dark:opacity-5 transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    />
  );
}
