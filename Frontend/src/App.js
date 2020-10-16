import React from "react";
import CardSection from "./components/CardSection";
import HeroSection from "./components/HeroSection";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CardSection />
      <Footer />
    </div>
  );
};

export default App;
