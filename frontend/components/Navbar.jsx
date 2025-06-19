import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { HandCoins } from 'lucide-react';
import {useNavigate} from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full px-4 py-2 shadow-sm border-b flex items-center justify-between bg-background">
      <div className="flex items-center space-x-3">
        <HandCoins className="text-primary" />
        <span className="text-xl font-semibold">Plannance</span>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
        <ModeToggle />
      </div>
    </nav>
  );
}
