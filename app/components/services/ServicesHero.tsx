"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

const CustomHomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-6 h-6 text-[#043A22] fill-current"
  >
    <path d="M 218.83 103.77 l -80 -75.48 a 1.14 1.14 0 0 1 -0.11 -0.11 a 16 16 0 0 0 -21.53 0 l -0.11 0.11 L 37.17 103.77 A 16 16 0 0 0 32 115.55 V 208 a 16 16 0 0 0 16 16 H 96 a 16 16 0 0 0 16 -16 V 160 h 32 v 48 a 16 16 0 0 0 16 16 h 48 a 16 16 0 0 0 16 -16 V 115.55 A 16 16 0 0 0 218.83 103.77 Z M 208 208 H 160 V 160 a 16 16 0 0 0 -16 -16 H 112 a 16 16 0 0 0 -16 16 v 48 H 48 V 115.55 l 0.11 -0.1 L 128 40 l 79.9 75.43 l 0.11 0.1 Z"></path>
  </svg>
);

const Customsports = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-6 h-6 text-[#043A22] fill-current"
  >
    <path d="M 169.47 48.79 a 8 8 0 0 0 -2.94 -15.73 C 150.42 36.08 137 44.18 128 56 c -11.26 -15 -29.36 -24 -50 -24 A 62.07 62.07 0 0 0 16 94 c 0 70 103.79 126.67 108.21 129 a 7.93 7.93 0 0 0 7.58 0 h 0 a 332.57 332.57 0 0 0 41.09 -27.22 a 8 8 0 1 0 -9.76 -12.67 c -10.31 7.94 -20 14.37 -27.12 18.82 V 73.7 C 141.84 60.75 153.94 51.7 169.47 48.79 Z M 120 202 C 93.58 185.41 32 141.71 32 94 A 46.06 46.06 0 0 1 78 48 c 18.91 0 34.86 9.78 42 25.64 Z M 232.55 96 a 8.85 8.85 0 0 1 -0.89 0 a 8 8 0 0 1 -7.94 -7.12 a 45.88 45.88 0 0 0 -20.17 -33.14 a 8 8 0 1 1 8.9 -13.29 a 61.83 61.83 0 0 1 27.17 44.67 A 8 8 0 0 1 232.55 96 Z m -2.09 35.62 c -5.67 11.37 -13.94 23 -24.59 34.49 a 8 8 0 1 1 -11.74 -10.86 c 9.61 -10.4 17 -20.75 22 -30.77 a 8 8 0 1 1 14.31 7.14 Z"></path>
  </svg>
);

const CustomDiamondIcon = () => (
  <div className="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="w-8 h-8 text-[#043A22] fill-current"
    >
      <g color="rgb(28, 51, 50)">
        <path d="M235.33,116.72L139.28,20.66a16,16,0,0,0-22.56,0L20.67,116.72a16,16,0,0,0,0,22.56L116.72,235.33a16,16,0,0,0,22.56,0l96.05-96.05A16,16,0,0,0,235.33,116.72ZM128,224L32,128,128,32l96,96Z"></path>
      </g>
    </svg>
  </div>
);

const CustomHexagon = () => (
  <div className="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="w-8 h-8 text-[#043A22] fill-current"
    >
      <g color="rgb(28, 51, 50)">
        <path d="M 223.68 66.15 L 135.68 18 h 0 a 15.88 15.88 0 0 0 -15.36 0 l -88 48.17 a 16 16 0 0 0 -8.32 14 v 95.64 a 16 16 0 0 0 8.32 14 l 88 48.17 a 15.88 15.88 0 0 0 15.36 0 l 88 -48.17 a 16 16 0 0 0 8.32 -14 V 80.18 A 16 16 0 0 0 223.68 66.15 Z M 216 175.82 L 128 224 L 40 175.82 V 80.18 L 128 32 h 0 l 88 48.17 Z"></path>
      </g>
    </svg>
  </div>
);

const Customwellness = () => (
  <div className="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="w-8 h-8 text-[#043A22] fill-current"
    >
      <g color="rgb(28, 51, 50)">
        <path d="M 201.54 54.46 A 104 104 0 0 0 54.46 201.54 A 104 104 0 0 0 201.54 54.46 Z M 96 210 V 152 h 64 v 58 a 88.33 88.33 0 0 1 -64 0 Z m 48 -74 H 112 V 100.94 l 32 -16 Z m 46.22 54.22 A 88.09 88.09 0 0 1 176 201.77 V 152 a 16 16 0 0 0 -16 -16 V 72 a 8 8 0 0 0 -11.58 -7.16 l -48 24 A 8 8 0 0 0 96 96 v 40 a 16 16 0 0 0 -16 16 v 49.77 a 88 88 0 1 1 110.22 -11.55 Z"></path>
      </g>
    </svg>
  </div>
);

const Customworkplace = () => (
  <div className="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="w-8 h-8 text-[#043A22] fill-current"
    >
      <g color="rgb(28, 51, 50)">
        <path d="M 112 152 a 8 8 0 0 0 -8 8 v 28.69 L 75.72 160.4 A 39.71 39.71 0 0 1 64 132.12 V 95 a 32 32 0 1 0 -16 0 v 37.13 a 55.67 55.67 0 0 0 16.4 39.6 L 92.69 200 H 64 a 8 8 0 0 0 0 16 h 48 a 8 8 0 0 0 8 -8 V 160 A 8 8 0 0 0 112 152 Z M 40 64 A 16 16 0 1 1 56 80 A 16 16 0 0 1 40 64 Z m 168 97 V 123.88 a 55.67 55.67 0 0 0 -16.4 -39.6 L 163.31 56 H 192 a 8 8 0 0 0 0 -16 H 144 a 8 8 0 0 0 -8 8 V 96 a 8 8 0 0 0 16 0 V 67.31 L 180.28 95.6 A 39.71 39.71 0 0 1 192 123.88 V 161 a 32 32 0 1 0 16 0 Z m -8 47 a 16 16 0 1 1 16 -16 A 16 16 0 0 1 200 208 Z"></path>
      </g>
    </svg>
  </div>
);

// Decorative divider for visual appeal
const Divider = () => (
  <div className="flex items-center justify-center my-10">
    <div className="w-40 h-[1px] bg-[#EBE5DA]"></div>
  </div>
);

const ServiceCard = ({
  icon,
  title,
  description,
  quote,
  features,
  ctaText,
  disabled = false,
  upcomingLabel,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  quote?: { text: string; author: string };
  features?: string[];
  ctaText?: string;
  disabled?: boolean;
  upcomingLabel?: string;
  delay?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.add('fade-in-slide');
              }
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="service-card px-10 py-12 w-full md:w-[480px] lg:w-[580px] flex flex-col gap-7 border border-[#EBE5DA] bg-[var(--background-color-plain)] rounded-[16px] min-h-[600px] hover:shadow-lg transition-all duration-500 ease-in-out relative overflow-hidden hover:border-[var(--text-color-light)]/40"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[var(--text-color-dark)]">
          <div className="icon-wrapper">
            {icon}
          </div>
          <h3 className="text-[28px] text-[var(--text-color-dark)] font-['Libre_Baskerville',serif] font-bold leading-tight transition-colors duration-300 group-hover:text-[var(--text-color-light)]">
            {title}
          </h3>
        </div>
        
        {upcomingLabel && (
          <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {upcomingLabel}
          </div>
        )}
      </div>

      {quote && (
        <div className="border-l-4 border-[var(--text-color-light)] pl-6 my-5 italic transition-all duration-300 hover:border-l-[6px]">
          <p className="text-[var(--text-color-dark)] font-['DM_Sans', 'sans-serif'] text-lg mb-2 font-medium">
            "{quote.text}"
          </p>
          <p className="text-[var(--text-color-light)] text-sm font-medium">– {quote.author}</p>
        </div>
      )}

      <p className="text-[var(--text-color-dark)] font-['DM_Sans', 'sans-serif'] text-[17px] leading-relaxed font-medium">
        {description}
      </p>

      {features && (
        <ul className="space-y-4 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
              <span className="text-[var(--text-color-light)] mt-1 text-lg">•</span>
              <p className="text-[var(--text-color-dark)]/90 font-['DM_Sans', 'sans-serif'] text-[16px] font-medium">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      )}

      {ctaText && (
        <button 
          disabled={disabled}
          className={`mt-auto w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out ${
            disabled 
              ? 'bg-amber-100 text-amber-700 border-2 border-amber-300 cursor-not-allowed flex items-center justify-center gap-2' 
              : 'bg-[var(--background-color-dark)] text-[var(--text-color-plain)] hover:shadow-md active:translate-y-0.5 hover:bg-[var(--background-color-dark)]/90'
          }`}
        >
          {disabled && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
          )}
          {ctaText} {disabled && "- Coming Soon"}
        </button>
      )}
    </div>
  );
};

const HealthServiceBox = ({ 
  icon, 
  title,
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string;
  delay?: number;
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (boxRef.current) {
                boxRef.current.classList.add('fade-in-up');
              }
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={boxRef}
      className="health-box opacity-0 bg-gradient-to-br from-[var(--background-color-plain)] to-[#f8f6f2] p-10 rounded-2xl border border-[#EBE5DA] shadow-sm hover:shadow-lg transition-all duration-500 ease-in-out group hover:border-[var(--text-color-light)]/40 hover:translate-y-[-5px]"
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full border border-[#EBE5DA] bg-[var(--background-color-plain)] transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:border-[var(--text-color-light)]/40">
          {icon}
        </div>
      </div>
      <h3 className="text-center font-['Libre_Baskerville',serif] text-xl text-[var(--text-color-dark)] mb-3 font-semibold group-hover:text-[var(--text-color-light)] transition-colors duration-300">
        {title}
      </h3>
      <div className="w-0 h-0.5 bg-[var(--text-color-light)] mx-auto mb-4 opacity-80 transition-all duration-500 group-hover:w-24"></div>
    </div>
  );
};

const services = [
  {
    icon: <Customwellness />,
    title: "Rem Fresh",
    quote: {
      text: "We are what we repeatedly eat. Healthy eating is not an act, but a habit.",
      author: "Felicity Luckey"
    },
    description: "Enjoy delicious, healthy, and balanced meals delivered straight to your door. Perfect for busy lifestyles or those seeking support with healthy eating.",
    features: [
      "Diverse and authentic menu crafted by expert chefs",
      "Customizable delivery schedules and cuisine preferences",
      "Dietitian-approved meals for optimal nutrition",
      "Option to receive just the recipes for home cooking"
    ],
    ctaText: "Explore Meal Plans"
  },
  {
    icon: <CustomDiamondIcon />,
    title: "Rem Essentials",
    quote: {
      text: "The right tools make any journey easier.",
      author: "RemDi Team"
    },
    description: "Discover our curated selection of health and wellness products designed to complement your RemDi programme and support your journey.",
    features: [
      "Premium blood glucose monitors for accurate tracking",
      "High-quality nutritional supplements",
      "Advanced fitness tracking devices",
      "Exclusive healthy recipe collections"
    ],
    ctaText: "Explore Products",
    disabled: true,
    upcomingLabel: "Coming Soon"
  }
];

const ServicesHero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const programs = [
    {
      icon: "💉",
      title: "RemDia",
      description: "Type 2 and Pre Diabetes Reversal Programme",
      path: "/programs/remdia"
    },
    {
      icon: "🌺",
      title: "Rem Bliss",
      description: "Programme for PCOS/PCOD and Menopause",
      path: "/programs/rembliss"
    },
    {
      icon: "🫀",
      title: "Rem Meta",
      description: "Tackling Metabolic issues such as High BP",
      path: "/programs/remmeta"
    },
    {
      icon: "🏃",
      title: "Rem Fit",
      description: "Program for intense weight loss @4-5kg/month",
      path: "/programs/remfit"
    },
    {
      icon: "⚖️",
      title: "Rem Balance",
      description: "Program for maintaining consistent weight",
      path: "/programs/rembalance"
    },
    {
      icon: "💪",
      title: "Rem Protein",
      description: "Protein-focused nutrition for healthy weight gain",
      path: "/programs/remprotein"
    }
  ];

  useEffect(() => {
    // Add CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInSlide {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .fade-in-up {
        animation: fadeInUp 0.8s forwards ease-out;
      }
      
      .fade-in-slide {
        animation: fadeInSlide 0.8s forwards ease-out;
      }
      
      .icon-container {
        display: contents;
        transition: transform 0.3s ease-in-out;
      }
      
      .icon-container:hover svg {
        transform: scale(1.1);
      }
      
      .service-card:hover .icon-wrapper {
        transform: rotate(5deg);
      }
      
      .icon-wrapper {
        transition: transform 0.3s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    // Observers for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="pt-20 overflow-hidden">
      <div className="bg-[var(--background-color-dark)] sm:p-20 sm:py-32 sm:pb-52 py-20 pb-36 relative">
        
        <h1 
          ref={titleRef}
          className="opacity-0 font-['Libre_Baskerville',serif] text-3xl sm:text-6xl text-[var(--text-color-plain)] text-center max-w-3xl mx-auto font-bold relative z-10"
        >
          Supporting <span className="text-[var(--text-color-light)]">Your Health</span> Journey
        </h1>
      </div>
      
      <div className="bg-[var(--background-color-plain2)]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 px-4 relative -top-24 pb-0 ">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} delay={index * 200} />
          ))}
        </div>

        {/* Programs Section */}
        <div className="max-w-7xl mx-auto px-4  pb-20">
          <h3 className="text-center font-['Libre_Baskerville',serif] text-2xl md:text-3xl text-[var(--text-color-dark)] mb-8 font-semibold">
            Our <span className="text-[var(--text-color-light)]">Programs</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <Link href={program.path} key={program.title}>
                <div
                  className="group bg-white rounded-xl p-6 border border-[#EBE5DA] hover:border-[var(--text-color-light)]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                      {program.icon}
                    </span>
                    <div>
                      <h4 className="font-['Libre_Baskerville',serif] text-xl text-[var(--text-color-dark)] mb-2 group-hover:text-[var(--text-color-light)] transition-colors duration-300">
                        {program.title}
                      </h4>
                      <p className="text-[var(--text-color-dark)]/70 text-sm font-['DM_Sans', 'sans-serif']">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
