import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import { AuthProvider } from "./components/context/AuthContext";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";

export default function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>} /> 
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      </AuthProvider>
      </BrowserRouter>
  );
}
