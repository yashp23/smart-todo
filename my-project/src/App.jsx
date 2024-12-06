import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponents from "./components/Navbar"; // Navbar component
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./components/register/Signup";

import AddTask from "./components/addTask/Add-Task";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Login from "./components/loginroutes/Login";
import ShowTask from "./components/Show-task/showTask";
import Logout from "./logout/Logout";

function App() {
  return (
    <Router>
      <NavbarComponents />
      <div style={{ marginTop: '50px' }}> {/* Adjust this value if needed */}
        <Routes>
          {/* Define routes for different components */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/showTask" element={<ShowTask />} />

          {/* Catch-all route for 404 - Page Not Found */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
