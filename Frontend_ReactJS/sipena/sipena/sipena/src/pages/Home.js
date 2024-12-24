// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Selamat Datang di Aplikasi CRUD Penelitian</h1>
      <Link to="/penelitian" className="bg-blue-500 text-white p-2 rounded">
        Kelola Data Penelitian
      </Link>
    </div>
  );
};

export default Home;