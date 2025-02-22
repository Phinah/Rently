"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCopy, AiOutlineShareAlt } from "react-icons/ai";

export default function PropertyDetails({ property }) {
  const [copied, setCopied] = useState(false);
  const copyCurrentUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="max-w-9xl mx-auto p-4">
      {/* Property Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-semibold">{property.name}</h1>
          <p className="text-gray-500">
            {property.apartmentType} - {property.houseAddress}
          </p>
        </div>
        <div className="flex space-x-4 text-gray-600">
          {/* <button className="flex items-center space-x-1">
            <AiOutlineHeart className="text-xl" />
            <span>Favorite</span>
          </button> */}
          {copied ? (
            <span className="text-green-500">Link copied!</span>
          ) : (
            <button
              className="flex items-center space-x-1"
              onClick={copyCurrentUrl}
            >
              <AiOutlineShareAlt className="text-xl" />
              <span>Share</span>
            </button>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="flex flex-col lg:flex-row gap-4 max-h-[600px]">
        {property.propertyImages?.[0] && (
          <div className="w-full lg:w-1/2">
            <img
              src={property.propertyImages[0]}
              alt="Property"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        <div className="w-full lg:w-1/2 flex flex-wrap gap-2">
          {property.propertyImages?.slice(1, 5).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property ${index}`}
              className="w-[49%] h-[49%] object-cover rounded-lg"
            />
          ))}
          {/* <div className="relative w-[49%] h-[49%]">
            <img
              src="https://i.ytimg.com/vi/UbtJncQuHGE/maxresdefault.jpg"
              alt="Thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-white text-lg">+23 photos</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Property Info */}
      <div className="mt-4">
        <p className="text-xl font-semibold">
          {property.currency} {Number(property.price)?.toLocaleString()} per{" "}
          {property.period}
        </p>
        <p className="text-gray-500">
          {property.guests} guests · {property.bedrooms} rooms ·{" "}
          {property.bathrooms} bathroom · {property.toilets} toilet
        </p>
      </div>
    </div>
  );
}
