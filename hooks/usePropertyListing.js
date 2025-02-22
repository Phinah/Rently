import axios from "axios";

import { useState } from "react";
export const usePropertyListing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submitProperty = async (data) => {
    setLoading(true);
    await axios
      .post("/api/properties/register", data)
      .then((response) => {
        setSuccess(response.data.message);
        return true;
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, success, submitProperty };
};
