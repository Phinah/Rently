import axios from "axios";

import { useState } from "react";
export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);

  const signIn = async (data) => {
    const { email, password } = data;
    setLoading(true);
    await axios
      .post("/api/user/login", {
        email,
        password,
      })
      .then((response) => {
        setSuccess(response.data.message);
        setUser(response.data.user);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setSuccess(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, success, user, signIn };
};
