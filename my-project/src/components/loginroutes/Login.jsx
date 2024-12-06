import axios from "axios";
import React, { useState } from "react";
import zod from "zod";
import { useNavigate } from "react-router-dom";

const formSchemaValidation = zod.object({
  email: zod.string().email("Invalid email format"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must not exceed 50 characters"),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const { email, password } = formData;
    const errors = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;
    // Zod validation
    const validation = formSchemaValidation.safeParse(formData);

    if (!validation.success) {
      const zodErrors = validation.error.flatten().fieldErrors;
      setErrors(zodErrors); // Set validation errors
      return;
    } 

    // Clear previous errors if validation passes
    setErrors({});

    try {
      // Simulate sending data to the server
      const data = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      console.log("Response data:", data);

      setFormData({ email: "", password: "" });
      navigate("/addTask")
      console.log("Form data submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors(error);
    }
  };

  return (
    <div className="w-full h-[93vh] flex">
      {/* Left Side */}
      <div className="w-1/2 h-full bg-gray-700 flex items-center justify-center">
        <div className="flex flex-col text-center px-8">
          <h1 className="text-5xl text-white font-bold my-4">
            Turn your idea into reality
          </h1>
          <p className="text-white text-md">
            Let's first unlock the Application and start working on them
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 h-full bg-black flex justify-center items-center">
        <form
          className="bg-gray-300 p-8 rounded-lg shadow-lg w-96"
          onSubmit={SubmitHandler}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email[0]}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              onChange={changeHandler}
              name="password"
              value={formData.password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password[0]}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 font-bold"
          >
            Login
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
