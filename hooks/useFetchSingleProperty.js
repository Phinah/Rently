import axios from "axios";
import { useState } from "react";

export const useFetchSingleProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [property, setProperty] = useState(null);

  const fetchProperty = async (id) => {
    setLoading(true);
    await axios
      .get(`/api/properties/fetch/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, fetchProperty, property };
};
