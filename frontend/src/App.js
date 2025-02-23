import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Property from "./pages/Property";
import Users from "./pages/Users";
import Lease from "./pages/Lease";
import Address from "./pages/Address";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="/property" element={<Property/> } />
        <Route path="/users" element={<Users/>}/>
        <Route path="/lease" element={<Lease/>}/>
        <Route path="/address" element={<Address/>}/>
      </Routes>
    </Router>
  );
};

export default App;
