"use client";

import { useState } from "react";
import { BsPatchCheckFill, BsPersonCircle } from "react-icons/bs";

export default function PropertyAmenities({ property }) {
  const [showMore, setShowMore] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const description = property?.description || "";
  return (
    <div className="max-w-9xl mx-auto p-6">
      <div className="flex justify-between flex-col-reverse lg:flex-row items-start mb-6">
        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <hr className="mb-6" />
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-700 mt-2">
              {showMore
                ? description
                : description.slice(0, 300) +
                  `${description.length > 300 ? "..." : ""}`}
              {description.length > 300 && (
                <span
                  className="text-blue-900 cursor-pointer ml-2"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less" : "Show more"}
                </span>
              )}
            </p>
          </div>

          {/* Facilities */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold">Facilities</h2>
            <div className="flex flex-wrap gap-y-4 mt-2">
              {property?.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700 w-1/2"
                >
                  <span className="text-xl">{"=>"}</span>
                  <span>{feature}</span>
                </div>
              ))}
              {/* <div className="flex items-center gap-2 text-gray-700 w-1/2">
                <span className="text-xl">🌼</span>
                <span>Garden view</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 w-1/2">
                <span className="text-xl">📶</span>
                <span>Wifi</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 w-1/2">
                <span className="text-xl">🚗</span>
                <span>Free parking on premises</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 w-1/2">
                <span className="text-xl">🍴</span>
                <span>Kitchen</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 w-1/2">
                <span className="text-xl">🖥️</span>
                <span>Dedicated workspace</span>
              </div> */}
            </div>
            <button className="mt-8 px-4 py-2 bg-primary text-white rounded-lg underline">
              Show all facilities
            </button>
          </div>

          {/* Verification */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-green-600">
              <BsPatchCheckFill className="text-xl" />
              <span className="text-md">Property is verified.</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              If you think something is not right, report it and we will
              investigate.
            </p>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg">
              Report Property
            </button>
          </div>

          {/* Location */}
          {/* <div className="mb-6">
            <h2 className="text-lg font-semibold">Location</h2>
            <p className="text-gray-500">To be implemented</p>
          </div> */}

          {/* Similar Properties */}
          {/* <div>
            <h2 className="text-lg font-semibold">Similar Properties</h2>
            <p className="text-gray-500">To be implemented</p>
          </div> */}
        </div>

        {/* Agent Contact */}
        <div className="w-full lg:w-1/4 lg:ml-8 mt-6 lg:mt-0 lg:pt-10">
          <div className="p-4 border border-gray-200 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700 mb-4">Meet the Agent</h3>
            <div className="flex items-center mb-4">
              {/* <img
                src="/path/to/agent-avatar.jpg"
                alt="Agent"
                className="w-10 h-10 rounded-full mr-4"
              /> */}
              <BsPersonCircle size={40} className="text-gray-500" />
              <div className="ml-2">
                <p className="font-semibold text-gray-800">
                  {property.owner?.firstName} {property?.owner?.lastName}
                </p>
                <p className="text-sm text-gray-500">Joined this week</p>
              </div>
            </div>
            <button
              className="w-full mb-2 px-4 py-2 bg-primary text-white rounded-lg"
              onClick={() => setShowContact(!showContact)}
            >
              {showContact ? property?.owner?.email : "Show Contact"}
            </button>
            <a
              href={`mailto:${property.owner?.email}`}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg flex items-center justify-center"
            >
              <span className="mr-2">💬</span> Send a message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
