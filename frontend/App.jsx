import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import { AuthProvider } from "./components/context/AuthContext";

export default function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>} /> 
      </Routes>
      </AuthProvider>
      </BrowserRouter>
  );
}
