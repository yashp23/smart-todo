import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-24 px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to Our Application
        </h1>
        <p className="text-xl mb-8">
          Unlock amazing features to help you stay organized and connected.
        </p>
        <button className="bg-white text-blue-500 py-3 px-8 rounded-full font-semibold text-lg hover:bg-gray-200 transition duration-300">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">Amazing Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Task Management</h3>
            <p className="text-gray-700">
              Stay on top of your tasks and never miss a deadline. Organize your work and personal tasks in one place.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Collaborate with Teams</h3>
            <p className="text-gray-700">
              Share your tasks and collaborate with teammates efficiently. Easily track progress and stay connected.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Cloud Sync</h3>
            <p className="text-gray-700">
              Sync all your tasks across devices. Work on the go and stay up to date no matter where you are.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">About Our App</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-4">
            Our application helps you stay organized, productive, and connected. Whether you’re managing personal
            tasks or collaborating with a team, we’ve got you covered. Our easy-to-use interface and seamless
            functionality make it the perfect tool for anyone looking to boost their productivity.
          </p>
          <p className="text-lg text-gray-700">
            Try it today and experience the power of a well-organized life!
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          {/* Testimonial 1 */}
          <div className="max-w-xs bg-gray-100 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">"This app has transformed the way I manage my work! It keeps me organized and efficient."</p>
            <p className="font-bold text-gray-800">Jane Doe</p>
            <p className="text-gray-600">Project Manager</p>
          </div>

          {/* Testimonial 2 */}
          <div className="max-w-xs bg-gray-100 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">"Collaborating with my team has never been easier. Everything is in one place!"</p>
            <p className="font-bold text-gray-800">John Smith</p>
            <p className="text-gray-600">Software Developer</p>
          </div>

          {/* Testimonial 3 */}
          <div className="max-w-xs bg-gray-100 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">"I love how I can sync everything across devices. I never miss an update!"</p>
            <p className="font-bold text-gray-800">Sarah Lee</p>
            <p className="text-gray-600">Designer</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-500 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Ready to get started?</h2>
        <p className="text-lg mb-8">Sign up today and unlock the full potential of your productivity!</p>
        <button  className="bg-white text-blue-500 py-3 px-8 rounded-full font-semibold text-lg hover:bg-gray-200 transition duration-300">
         <Link to={"/signup"} >Sign Up Now</Link> 
        </button>
      </section>
    </div>
  );
};

export default Home;
