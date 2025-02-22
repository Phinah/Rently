"use client";

import { useUser } from "@/contexts/UserContexts";
import { usePropertyListing } from "@/hooks/usePropertyListing";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import uploadFile from "@/util/uploadFile";

const ListYourProperty = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [uploadingImageIndex, setUploadingImageIndex] = useState(null);

  const { submitProperty, error, success, loading } = usePropertyListing();

  const [propertyData, setPropertyData] = useState({
    name: "",
    apartmentType: "",
    guests: 0,
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    features: [],
    description: "",
    images: [],
    address: "",
    province: "",
    district: "",
    sector: "",
    landmark: "",
    estate: "",
    currency: "",
    price: 0,
    period: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...propertyData,
      houseAddress: propertyData.address,
      propertyImages: propertyData.images,
      estateName: propertyData.estate,
      userId: user.id,
      guests: parseInt(propertyData.guests),
      bedrooms: parseInt(propertyData.bedrooms),
      bathrooms: parseInt(propertyData.bathrooms),
      toilets: parseInt(propertyData.toilets),
      price: Number(propertyData.price),
    };
    delete data.address;
    delete data.images;
    delete data.estate;
    if (
      isNaN(data.guests) ||
      isNaN(data.bedrooms) ||
      isNaN(data.bathrooms) ||
      isNaN(data.toilets) ||
      isNaN(data.price)
    ) {
      toast.error("Please enter valid numbers");
      return;
    }
    if (await submitProperty(data)) {
      router.push("/");
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPropertyData({
        ...propertyData,
        features: [...propertyData.features, name],
      });
    } else {
      setPropertyData({
        ...propertyData,
        features: propertyData.features.filter((feature) => feature !== name),
      });
    }
  };

  const handleImageUpload = async (e, index) => {
    if (!e.target?.files[0]) return;
    const file = e.target.files[0];
    try {
      setUploadingImageIndex(index);
      const response = await uploadFile(file);
      if (!response) {
        throw new Error("Upload failed");
      }
      setPropertyData({
        ...propertyData,
        images: [...propertyData.images, response],
      });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Image upload failed");
    } finally {
      setUploadingImageIndex(null);
    }
  };

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/login");
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (error !== null && error !== "" && !loading && !success) {
      toast.error(error);
    } else if (success && !loading && error === null) {
      toast.success(success);
      router.push("/");
    } else if (loading) {
      const toastId = toast.loading("Loading...");
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [loading, error, success]);

  const isTab1Valid =
    propertyData.name !== "" &&
    propertyData.apartmentType !== "" &&
    propertyData.guests !== 0 &&
    propertyData.bedrooms !== 0 &&
    propertyData.bathrooms !== 0 &&
    propertyData.toilets !== 0 &&
    propertyData.description !== "";
  const isTab2Valid =
    propertyData.images.length > 0 &&
    propertyData.address !== "" &&
    propertyData.province !== "" &&
    propertyData.district !== "" &&
    propertyData.sector !== "" &&
    propertyData.landmark !== "" &&
    propertyData.estate !== "";
  const isTab3Valid =
    propertyData.currency !== "" &&
    propertyData.price !== 0 &&
    propertyData.period !== "";

  const tab1ValidationMessage = !isTab1Valid ? "Please fill in all fields" : "";
  const tab2ValidationMessage = !isTab2Valid ? "Please fill in all fields" : "";
  const tab3ValidationMessage = !isTab3Valid ? "Please fill in all fields" : "";

  const handleNext = (e) => {
    if (activeTab === 0 && isTab1Valid) {
      setActiveTab(activeTab + 1);
    } else if (activeTab === 1 && isTab2Valid) {
      setActiveTab(activeTab + 1);
    } else if (activeTab === 2 && isTab3Valid) {
      handleSubmit(e);
    } else {
      if (activeTab === 0) {
        toast.error(tab1ValidationMessage);
      } else if (activeTab === 1) {
        toast.error(tab2ValidationMessage);
      } else if (activeTab === 2) {
        toast.error(tab3ValidationMessage);
      }
    }
  };

  const tabsInfo = [
    {
      title: "Step 1",
      description: "House Information",
    },
    {
      title: "Step 2",
      description: "House Images",
    },
    {
      title: "Step 3",
      description: "House Pricing",
    },
  ];
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* tab header */}
      <div className="flex justify-center space-x-6">
        {tabsInfo.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer p-4 flex-1`}
            // onClick={() => setActiveTab(index)}
          >
            <div
              className={`h-[2px] w-full ${
                activeTab === index ? "bg-primary" : "bg-gray-400"
              }`}
            ></div>
            <div
              className={` mt-2 ${
                activeTab === index ? "text-primary font-bold" : "text-gray-600"
              }`}
            >
              {tab.title}
            </div>
            <div
              className={`text-sm ${
                activeTab === index ? "text-primary font-bold" : "text-gray-600"
              }`}
            >
              {tab.description}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs CONTENT */}
      {/* first tab */}
      {activeTab === 0 && (
        <div className="mt-4 px-6">
          <h2 className="text-2xl font-bold mb-4">Tell us about your place</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name of Property
              </label>
              <input
                type="text"
                id="name"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter name of property"
                onChange={handleChanges}
                name="name"
                value={propertyData.name}
              />
            </div>
            <div>
              <label
                htmlFor="apartment"
                className="block text-gray-700 font-medium mb-2"
              >
                Apartment Type
              </label>
              <select
                id="apartment"
                className="border rounded-lg p-2 w-full"
                name="apartmentType"
                onChange={handleChanges}
                value={propertyData.apartmentType}
              >
                <option value="">Select apartment type</option>
                <option value="Single Room">Single Room</option>
                <option value="Two Room">Two Room</option>
                <option value="Three Room">Three Room</option>
                <option value="Four Room">Four Room</option>
              </select>
            </div>
            {/* No. of guests, No. of Bedrooms, No. of Bathrooms, No. of Toilets */}

            <div>
              <label
                htmlFor="guests"
                className="block text-gray-700 font-medium mb-2"
              >
                No. of Guests
              </label>
              <input
                type="number"
                id="guests"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter number of guests"
                onChange={handleChanges}
                name="guests"
                value={propertyData.guests}
              />
            </div>

            <div>
              <label
                htmlFor="bedrooms"
                className="block text-gray-700 font-medium mb-2"
              >
                No. of Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter number of bedrooms"
                onChange={handleChanges}
                name="bedrooms"
                value={propertyData.bedrooms}
              />
            </div>

            <div>
              <label
                htmlFor="bathrooms"
                className="block text-gray-700 font-medium mb-2"
              >
                No. of Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter number of bathrooms"
                onChange={handleChanges}
                name="bathrooms"
                value={propertyData.bathrooms}
              />
            </div>

            <div>
              <label
                htmlFor="toilets"
                className="block text-gray-700 font-medium mb-2"
              >
                No. of Toilets
              </label>
              <input
                type="number"
                id="toilets"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter number of toilets"
                onChange={handleChanges}
                name="toilets"
                value={propertyData.toilets}
              />
            </div>

            {/* Features */}
            <div className="col-span-2">
              <label
                htmlFor="features"
                className="block text-gray-700 font-medium mb-2"
              >
                Features
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Survey",
                  "Swimming pool",
                  "Gym",
                  "Security",
                  "Wifi",
                  "Cafe",
                  "Coffee Shop",
                  "Bar",
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      id={feature}
                      className="mr-2"
                      onChange={handleCheckbox}
                      name={feature}
                      checked={propertyData.features.includes(feature)}
                    />
                    <label htmlFor={feature}>{feature}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Provide a brief description about your place
             */}
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter description of property"
                rows={5}
                onChange={handleChanges}
                name="description"
                value={propertyData.description}
              ></textarea>
            </div>
          </div>
        </div>
      )}

      {/* second tab */}
      {activeTab === 1 && (
        <div className="mt-4 px-6">
          <h2 className="text-2xl font-bold mb-4">
            Tell us where your place is located
          </h2>
          <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: Math.max(6, propertyData.images.length + 1) })
  .map((_, index) => index)
  .map((image, index) =>
    uploadingImageIndex === index ? (
      <div
        key={image}
        className="relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      </div>
    ) : propertyData.images[index] ? (
      <div
        key={image}
        className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
      >
        <img
          src={propertyData.images[index]}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>
    ) : (
      <label
        key={`empty-${index}`}
        className="relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex items-center justify-center"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log('File input change:', e.target.files);
            handleImageUpload(e, index);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center pointer-events-none">
          <span className="text-gray-600 text-3xl mb-2">+</span>
          <span className="text-sm text-gray-500">Click to upload image</span>
        </div>
      </label>
    )
  )}

          </div>
          <div className="mt-4">
            {/* House Address */}
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              House Address
            </label>
            <input
              type="text"
              id="address"
              className="border rounded-lg p-2 w-full"
              placeholder="Enter address of property"
              onChange={handleChanges}
              name="address"
              value={propertyData.address}
            />
            {/* province, district, sector */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label
                  htmlFor="province"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Province
                </label>
                <select
                  id="province"
                  className="border rounded-lg p-2 w-full"
                  onChange={handleChanges}
                  name="province"
                  value={propertyData.province}
                >
                  <option value="">Select province</option>
                  <option value="Kigali">Kigali</option>
                  <option value="Western">Western</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Southern">Southern</option>
                  <option value="Nothern">Northern</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="district"
                  className="block text-gray-700 font-medium mb-2"
                >
                  District
                </label>
                <select
                  id="district"
                  className="border rounded-lg p-2 w-full"
                  onChange={handleChanges}
                  name="district"
                  value={propertyData.district}
                >
                  <option value="">Select district</option>
                  <option value="Gasabo">Gasabo</option>
                  <option value="Kicukiro">Kicukiro</option>
                  <option value="Nyarugenge">Nyarugenge</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="sector"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Sector
                </label>
                <select
                  id="sector"
                  className="border rounded-lg p-2 w-full"
                  onChange={handleChanges}
                  name="sector"
                  value={propertyData.sector}
                >
                  <option value="">Select sector</option>
                  <option value="Remera">Remera</option>
                  <option value="Gisozi">Gisozi</option>
                  <option value="Kimironko">Kimironko</option>
                </select>
              </div>
            </div>

            {/* Landmark (Market, Filling station, ...) or Bustop, Name of Estate (if Applicable)             */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="landmark"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Landmark
                </label>
                <input
                  type="text"
                  id="landmark"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter landmark"
                  onChange={handleChanges}
                  name="landmark"
                  value={propertyData.landmark}
                />
              </div>
              <div>
                <label
                  htmlFor="estate"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name of Estate
                </label>
                <input
                  type="text"
                  id="estate"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter name of estate"
                  onChange={handleChanges}
                  name="estate"
                  value={propertyData.estate}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* third tab (currency, price, period (yearly, monthly)) */}
      {activeTab === 2 && (
        <div className="mt-4 px-6">
          <h2 className="text-2xl font-bold mb-4">Pricing Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="currency"
                className="block text-gray-700 font-medium mb-2"
              >
                Currency
              </label>
              <select
                id="currency"
                className="border rounded-lg p-2 w-full"
                onChange={handleChanges}
                name="currency"
                value={propertyData.currency}
              >
                <option value="">Select currency</option>
                <option value="RWF">RWF</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter price"
                onChange={handleChanges}
                name="price"
                value={propertyData.price}
              />
            </div>
            <div>
              <label
                htmlFor="period"
                className="block text-gray-700 font-medium mb-2"
              >
                Period
              </label>
              <select
                id="period"
                className="border rounded-lg p-2 w-full"
                onChange={handleChanges}
                name="period"
                value={propertyData.period}
              >
                <option value="">Select period</option>
                <option value="Year">Yearly</option>
                <option value="Month">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Next and Previous buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          onClick={() => setActiveTab(activeTab - 1)}
          disabled={activeTab === 0}
        >
          Previous
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg"
          onClick={handleNext}
          disabled={loading}
        >
          {activeTab === tabsInfo.length - 1
            ? loading
              ? "Submitting..."
              : "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default ListYourProperty;
