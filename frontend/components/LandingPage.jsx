import React from "react";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main className="p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to LifeLedger</h1>
        <p className="mt-4 text-muted-foreground">Manage your life like a ledger – secure, smart, and simple.</p>
      </main>
    </div>
  );
}
