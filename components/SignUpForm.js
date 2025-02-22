"use client";

import { useUser } from "@/contexts/UserContexts";
import { useSignUp } from "@/hooks/useSignUp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const router = useRouter();

  const { user: loggedInUser, loading: userLoading } = useUser();

  const { loading, error, success, signUp } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(signUpData);
    console.log('====================================');
console.log(signUpData);
console.log('====================================');
  };

  useEffect(() => {
    if (loggedInUser !== null && !userLoading) {
      router.push("/");
    }
  }, [loggedInUser, userLoading]);

  useEffect(() => {
    if (error !== null && error !== "" && !loading && !success) {
      toast.error(error);
    } else if (success && !loading && error === null) {
      toast.success(success);
      router.push("/login");
    } else if (loading) {
      const toastId = toast.loading("Loading...");
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [loading, error, success]);

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">
        Create an account
      </h2>
      <p className="text-center text-gray-600 text-sm mb-6">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 font-medium hover:underline">
          Log in here
        </a>
      </p>

      <form className="space-y-4">
        {/* First Name Field */}
        <div>
          <input
            type="text"
            placeholder="First name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2"
            required
            onChange={(e) =>
              setSignUpData({ ...signUpData, firstName: e.target.value })
            }
          />
        </div>

        {/* Last Name Field */}
        <div>
          <input
            type="text"
            placeholder="Last name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2"
            required
            onChange={(e) =>
              setSignUpData({ ...signUpData, lastName: e.target.value })
            }
          />
        </div>
        <div>
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="border rounded-lg p-2 w-full"
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, role: e.target.value })
                  }
                  name="sector"
                  value={signUpData.role}
                >
                  <option value="">Select Role</option>
                  <option value="Host">Host</option>
                  <option value="Renter">Renter</option>
                </select>
              </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2"
            required
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2"
            required
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
        </div>

        {/* Re-type Password Field */}
        <div>
          <input
            type="password"
            placeholder="Re-type password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2"
            required
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-900 transition duration-300"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Sign Up Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
      >
        <FaGoogle className="mr-2 text-lg" />
        Continue with Gmail
      </button>
    </div>
  );
};

export default SignUpForm;
