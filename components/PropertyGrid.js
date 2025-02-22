"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useFetchProperties } from "@/hooks/useFetchProperties";

const PropertyCard = ({ id, address, type, price, images, currency }) => {
  const [showControls, setShowControls] = useState(false);
  const sliderRef = React.useRef(null);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    appendDots: (dots) =>
      showControls ? (
        <div
          style={{
            position: "absolute",
            top: "95%",
            transform: "translateY(-50%)",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          {dots}
        </div>
      ) : (
        <div></div>
      ),
    customPaging: () => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      />
    ),
  };

  return (
    <div
      className="flex flex-col relative"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="relative rounded-2xl overflow-hidden mb-3">
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Property ${index}`}
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </Slider>
        {showControls && (
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4">
            <button
              className="text-white hover:text-gray-300 transition-colors bg-gray-900 bg-opacity-50 rounded-full p-2"
              onClick={handlePrev}
            >
              <ChevronLeftIcon size={32} />
            </button>
            <button
              className="text-white hover:text-gray-300 transition-colors bg-gray-900 bg-opacity-50 rounded-full p-2"
              onClick={handleNext}
            >
              <ChevronRightIcon size={32} />
            </button>
          </div>
        )}
      </div>
      <a href={`/properties/${id}`} className="">
        <h3 className="font-bold text-gray-900">{address}</h3>
        <p className="text-gray-600">{type}</p>
        <p className="font-semibold text-gray-900">
          {currency} {Number(price)?.toLocaleString()}{" "}
          <span className="text-sm text-gray-600 font-normal">/ month</span>
        </p>
      </a>
    </div>
  );
};

const PropertyGrid = ({ searchValue, isSearching }) => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const { fetchProperties, error, loading, properties } = useFetchProperties();

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (!loading && !error && properties) {
      setFilteredProperties(properties);
    }
  }, [error, loading, properties]);
  useEffect(() => {
    if (isSearching && properties) {
      const filtered = properties.filter((property) => {
        const addressMatch = property.houseAddress
          .toLowerCase()
          .includes(searchValue.address.toLowerCase());

        const priceMatch =
          (!searchValue.minPrice ||
            Number(property.price) >= Number(searchValue.minPrice)) &&
          (!searchValue.maxPrice ||
            Number(property.price) <= Number(searchValue.maxPrice));

        const typeMatch =
          !searchValue.type || property.apartmentType === searchValue.type;

        const bedroomsMatch =
          !searchValue.bedrooms ||
          (searchValue.bedrooms === "4+"
            ? property.bedrooms >= 4
            : property.bedrooms === Number(searchValue.bedrooms));

        const bathroomsMatch =
          !searchValue.bathrooms ||
          (searchValue.bathrooms === "4+"
            ? property.bathrooms >= 4
            : property.bathrooms === Number(searchValue.bathrooms));

        return (
          addressMatch &&
          priceMatch &&
          typeMatch &&
          bedroomsMatch &&
          bathroomsMatch
        );
      });

      setFilteredProperties(filtered);
    } else if (!isSearching && properties) {
      setFilteredProperties(properties);
    }
  }, [searchValue, isSearching, properties]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 gap-y-12">
      {filteredProperties?.length > 0 ? (
        filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            address={property.houseAddress}
            type={property.apartmentType}
            price={property.price}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            images={property.propertyImages}
            currency={property.currency}
            id={property.id}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          {loading ? "Loading..." : "No properties found."}
        </div>
      )}
    </div>
  );
};

export default PropertyGrid;
