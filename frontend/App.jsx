import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import { AuthProvider } from "./components/context/AuthContext";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { DashBoard } from "./components/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
      <Routes>
      <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          } />
      </Routes>
      </AuthProvider>
      </BrowserRouter>
  );
}
