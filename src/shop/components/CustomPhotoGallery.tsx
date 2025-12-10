import { useState } from "react";

interface Props {
  images: string[];
  productName: string;
}

export const CustomPhotoGallery = ({ images, productName }: Props) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <>
      {/* Main image */}
      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={images[selectedImage] || "/placeholder.svg"}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Thumbnail images */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index
                ? "border-black"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
};
