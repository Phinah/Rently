"use client";
import PropertyAmenity from "@/components/PropertyAmenities";
import PropertyDetails from "@/components/PropertyDetails";
import { useFetchSingleProperty } from "@/hooks/useFetchSingleProperty";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PropertyPage() {
  const { id } = useParams();
  const { property, loading, error, fetchProperty } =
    useFetchSingleProperty(id);

  useEffect(() => {
    fetchProperty(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <>
      <PropertyDetails property={property || {}} />
      <PropertyAmenity property={property || {}} />
    </>
  );
}
