// src/pages/HomePage.jsx
import React from "react";
import HeroSection from "../components/home/HeroSection/HeroSection";
import CareSection from "../components/home/CareSection/CareSection";
import DepartmentsSection from "../components/home/Departments/DepartmentsSection";
import WhyChooseUs from "../components/home/WhyChooseUs/WhyChooseUs";
import StandardsSection from "../components/home/Standards/StandardsSection";
import BeforeAfterSection from "../components/home/BeforeAfter/BeforeAfterSection";
import ArticlesSection from "../components/home/Articles/ArticlesSection";
import ServicesShowcase from "../components/home/ServicesShowcase/ServicesShowcase";
import TreatmentsStrip from "../components/home/Treatments/TreatmentsStrip";


const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CareSection image="/front.jpg" />
      <DepartmentsSection />
      
      <ServicesShowcase />
      <WhyChooseUs bg="/tt.jpg" speed={0.32} />
      <StandardsSection bg="/background.jpg" />
      <TreatmentsStrip />
      <BeforeAfterSection />
      <ArticlesSection />
    </>
  );
};

export default HomePage;
