import axios from "axios";

import { useState } from "react";
export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const signUp = async (data) => {
    const { firstName, lastName, email, password } = data;
    setLoading(true);
    await axios
      .post("/api/user/register/signup", {
        firstName,
        lastName,
        email,
        password,
        role,
      })
      .then((response) => {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        setSuccess(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, success, signUp };
};
