"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProductImage } from "@/lib/types/product";

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const t = useTranslations("products");
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

  if (!images || images.length === 0) {
    return (
      <div className="grid aspect-square place-items-center rounded-4xl bg-sand">
        <span className="text-muted">{t("gallery.noImage")}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse">
      <div
        ref={imageContainerRef}
        className="relative aspect-square grow cursor-zoom-in overflow-hidden rounded-4xl bg-surface"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt || productName}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isZoomed ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
        {isZoomed && (
          <div
            className="absolute inset-0 bg-surface bg-no-repeat"
            style={{
              backgroundImage: `url(${images[currentImageIndex].src})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: "250%",
            }}
          />
        )}
        {images.length > 1 && (
          <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium tabular-nums backdrop-blur">
            {currentImageIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex shrink-0 gap-2 overflow-x-auto pb-1 md:max-h-150 md:w-20 md:flex-col md:overflow-y-auto md:pb-0">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setCurrentImageIndex(index)}
              aria-label={t("gallery.thumbnailAlt", { number: index + 1 })}
              aria-current={currentImageIndex === index}
              className={`relative size-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-surface transition ${
                currentImageIndex === index
                  ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
