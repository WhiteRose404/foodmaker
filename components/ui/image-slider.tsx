"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import image1 from "../../public/slidenum1.png";
import image2 from "../../public/slidenum2.png";
import image3 from "../../public/slidenum3.png";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// Interface for image data
interface ImageData {
  src: StaticImageData;
}

// Image data array
const images: ImageData[] = [
  {
    src: image1,
  },
  {
    src: image2,
  },
  {
    src: image3,
  },
];

export default function ImageSlider() {
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-[99%]">
      <div
        className="relative w-full aspect-[347/124] group"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[currentIndex].src}
          alt={`Slider Image ${currentIndex + 1}`}
          layout="fill"
          className="rounded-xl transition-all duration-500 ease-in-out cursor-pointer"
        />
      </div>
      <button
        className="absolute left-2 top-1/2 transform rounded-full hover:bg-[#ff006b] mx-1 -mt-[10px] -translate-y-1/2 bg-white text-white p-3 group"
        onClick={prevSlide}
      >
        <FaChevronLeft className="text-black group-hover:text-white" />
      </button>
      <button
        className="absolute right-2 top-1/2 transform rounded-full hover:bg-[#ff006b] mx-1 -mt-[10px] -translate-y-1/2 bg-white text-white p-3 group"
        onClick={nextSlide}
      >
        <FaChevronRight className="text-black group-hover:text-white" />
      </button>
      <div className="absolute flex justify-center mt-4 left-1/2 right-1/2 bottom-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 aspect-square mx-1 ${
              index === currentIndex
                ? "bg-[#ff006b] rounded-xl"
                : "bg-[#ffb2d2] rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))} 
      </div>
    </div>
  );
}