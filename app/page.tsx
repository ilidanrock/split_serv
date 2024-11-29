"use client"
import { useState } from "react";
import RentUtilityCalc from "./components/ServiceBillCalculator/ServiceBillCalculator";
import KWhCalculatorMonth from "./components/kWhCalculatorMonth/kWhCalculatorMonth";
import { CostosPorInquilino } from "./components/CostosPorInquilinos/CostosPorInquilinos";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const components = [
    <KWhCalculatorMonth key={0} />,
    <RentUtilityCalc key={1} />,
    <CostosPorInquilino key={2} />
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + components.length) % components.length
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full max-w-4xl">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {components.map((component, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex justify-center items-center"
              >
                {component}
              </div>
            ))}
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full"
        >
          &#8249;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
