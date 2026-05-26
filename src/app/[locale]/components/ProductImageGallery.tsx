"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ProductImage } from "@/lib/types/product";

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Fără imagine</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main product image with zoom */}
      <div
        ref={imageContainerRef}
        className="aspect-square relative bg-white rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "zoom-in" }}
      >
        <Image
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt || productName}
          fill
          className={`object-contain p-4 transition-opacity duration-300 ${
            isZoomed ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          priority
        />
        {isZoomed && (
          <div
            className="absolute inset-0 bg-white"
            style={{
              backgroundImage: `url(${images[currentImageIndex].src})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: "250%",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>

      {/* Thumbnail gallery */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative h-16 w-16 flex-shrink-0 rounded-md border-2 transition-all ${
                currentImageIndex === index
                  ? "border-primary"
                  : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt || `Product image ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
