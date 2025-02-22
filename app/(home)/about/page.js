import React from "react";

export default function About() {
  return (
    <div className="rounded-lg p-6 max-w-2xl w-full mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">About Rently247</h1>
      <p className="mb-4">
        Rently247 is a property rental platform that connects property owners
        and students looking for accommodation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-medium mb-2">For Property Owners</h2>
          <p>
            List your property and connect with reliable student tenants. We
            make it easy to manage your listings and communicate with potential
            tenants.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-2">For Students</h2>
          <p>
            Find your perfect student accommodation with our easy-to-use
            platform. Browse listings, compare options, and securely book your
            next rental.
          </p>
        </div>
      </div>
    </div>
  );
}
