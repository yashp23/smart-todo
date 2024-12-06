import React, { useState } from "react";
import axios from "axios";
import { z as zod } from "zod";
import { useNavigate } from "react-router-dom";

const formSchemaValidation = zod.object({
  name: zod
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters"),
  email: zod.string().email("Invalid email format"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must not exceed 50 characters"),
});

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    // Zod Validation
    const isValid = formSchemaValidation.safeParse(formData);

    if (!isValid.success) {
      const zodErrors = isValid.error.flatten().fieldErrors;
      setErrors(zodErrors);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      console.log("Response data:", data);

      setFormData({ name: "", email: "", password: "" }); // Clear form after success
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrors(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-[93vh] flex">
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

      <div className="w-1/2 h-full bg-black flex justify-center items-center">
        <form
          className="bg-gray-300 p-8 rounded-lg shadow-lg w-96"
          onSubmit={onSubmitHandler}
        >
          {/* {Object.keys(errors).length > 0 && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )} */}
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
            <p className="text-red-500 text-sm">{errors.name}</p>
          </div>
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
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            <p className="text-red-500 text-sm">{errors.password}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 font-bold"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="login" className="text-blue-500">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
