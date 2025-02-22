"use client";

import PropertyGrid from "@/components/PropertyGrid";
import PropertySearch from "@/components/PropertySearch";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState({
    address: "",
    maxPrice: "",
    minPrice: "",
    bedrooms: "",
    bathrooms: "",
    type: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  return (
    <div>
      <PropertySearch
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setIsSearching={setIsSearching}
      />
      <PropertyGrid searchValue={searchValue} isSearching={isSearching} />
    </div>
  );
}
