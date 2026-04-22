import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const Custommsg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-8 h-8 text-[#043A22] fill-current"
  >
    <path d="M 216 48 H 40 A 16 16 0 0 0 24 64 V 224 a 15.84 15.84 0 0 0 9.25 14.5 A 16.05 16.05 0 0 0 40 240 a 15.89 15.89 0 0 0 10.25 -3.78 a 0.69 0.69 0 0 0 0.13 -0.11 L 82.5 208 H 216 a 16 16 0 0 0 16 -16 V 64 A 16 16 0 0 0 216 48 Z M 40 224 h 0 Z M 216 192 H 82.5 a 16 16 0 0 0 -10.3 3.75 l -0.12 0.11 L 40 224 V 64 H 216 Z"></path>
  </svg>
);

const Customhome = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-6 h-6 text-[#043A22] fill-current"
  >
    <path d="M 218.83 103.77 l -80 -75.48 a 1.14 1.14 0 0 1 -0.11 -0.11 a 16 16 0 0 0 -21.53 0 l -0.11 0.11 L 37.17 103.77 A 16 16 0 0 0 32 115.55 V 208 a 16 16 0 0 0 16 16 H 96 a 16 16 0 0 0 16 -16 V 160 h 32 v 48 a 16 16 0 0 0 16 16 h 48 a 16 16 0 0 0 16 -16 V 115.55 A 16 16 0 0 0 218.83 103.77 Z M 208 208 H 160 V 160 a 16 16 0 0 0 -16 -16 H 112 a 16 16 0 0 0 -16 16 v 48 H 48 V 115.55 l 0.11 -0.1 L 128 40 l 79.9 75.43 l 0.11 0.1 Z"></path>
  </svg>
);

const Customcall = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-6 h-6 text-[#043A22] fill-current"
  >
    <path d="M 222.37 158.46 l -47.11 -21.11 l -0.13 -0.06 a 16 16 0 0 0 -15.17 1.4 a 8.12 8.12 0 0 0 -0.75 0.56 L 134.87 160 c -15.42 -7.49 -31.34 -23.29 -38.83 -38.51 l 20.78 -24.71 c 0.2 -0.25 0.39 -0.5 0.57 -0.77 a 16 16 0 0 0 1.32 -15.06 l 0 -0.12 L 97.54 33.64 a 16 16 0 0 0 -16.62 -9.52 A 56.26 56.26 0 0 0 32 80 c 0 79.4 64.6 144 144 144 a 56.26 56.26 0 0 0 55.88 -48.92 A 16 16 0 0 0 222.37 158.46 Z M 176 208 A 128.14 128.14 0 0 1 48 80 A 40.2 40.2 0 0 1 82.87 40 a 0.61 0.61 0 0 0 0 0.12 l 21 47 L 83.2 111.86 a 6.13 6.13 0 0 0 -0.57 0.77 a 16 16 0 0 0 -1 15.7 c 9.06 18.53 27.73 37.06 46.46 46.11 a 16 16 0 0 0 15.75 -1.14 a 8.44 8.44 0 0 0 0.74 -0.56 L 168.89 152 l 47 21.05 h 0 s 0.08 0 0.11 0 A 40.21 40.21 0 0 1 176 208 Z"></path>
  </svg>
);

const Custommail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-6 h-6 text-[#043A22] fill-current"
  >
    <path d="M 224 48 H 32 a 8 8 0 0 0 -8 8 V 192 a 16 16 0 0 0 16 16 H 216 a 16 16 0 0 0 16 -16 V 56 A 8 8 0 0 0 224 48 Z m -96 85.15 L 52.57 64 H 203.43 Z M 98.71 128 L 40 181.81 V 74.19 Z m 11.84 10.85 l 12 11.05 a 8 8 0 0 0 10.82 0 l 12 -11.05 l 58 53.15 H 52.57 Z M 157.29 128 L 216 74.18 V 181.82 Z"></path>
  </svg>
);

const GetInTouch = () => {
  return (
    <div className="w-full py-20 md:py-40 px-4 relative bg-[var(--background-color-plain2)]">
      {/* New SVG added here */}
      <div className="absolute -top-10 left-[50%] transform -translate-x-1/2">
        <svg
          viewBox="0 0 57 57"
          width="80"
          height="80"
          className="md:w-[110px] md:h-[110px]"
        >
          <path
            d="M 42.55 56.735 L 28.366 56.735 L 42.55 -0.002 Z M 14.182 56.735 L -0.003 56.735 L 14.182 -0.002 Z"
            transform="translate(0.159 0.113) rotate(180 21.65 28.866)"
            fill="#8FC2AB"
          />
          <path
            d="M 42.301 56.735 L 28.117 56.735 L 42.301 -0.002 Z M 13.933 56.735 L -0.252 56.735 L 13.933 -0.002 Z"
            transform="translate(14.592 0.113) rotate(180 21.65 28.866)"
            fill="#8FC2AB"
          />
        </svg>
      </div>

      <div className="max-w-8xl mx-auto">
        <ScrollAnimation delay={0.2}>
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-[var(--text-color-dark)] text-[28px] md:text-[40px] font-['Libre_Baskerville',serif]">
              Get moving, <span className="font-bold">get in touch!</span>
            </h2>
            <p className="text-[var(--text-color-dark)] font-['DM_Sans', 'sans-serif'] text-[16px] md:text-[20px] max-w-2xl mx-auto mb-8 md:mb-15 mt-4 md:mt-6 px-4">
              Reach out to us and let's embark on a journey towards a healthier,
              happier you. Your optimal health is just a conversation away!
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.4}>
          <div className="relative max-w-[1200px] mx-auto flex flex-col lg:block">
            {/* Image section */}
            <div className="w-full lg:w-[65%] h-[300px] md:h-[400px] lg:h-[450px] rounded-xl overflow-hidden bg-[#faf3e5] bg-opacity-90 flex items-center justify-center">
              <img
                src="images/get_in_touch.png"
                alt="Person exercising"
                className="w-full h-full object-contain md:pr-[15%]"
              />
            </div>

            {/* Content section - positioned absolutely to overlap */}
            <div className="relative lg:absolute lg:top-1/2 lg:right-0 lg:transform lg:-translate-y-1/2 w-full lg:w-[42%] p-6 md:p-8 lg:p-10 bg-[var(--background-color-plain)] rounded-2xl -mt-6 lg:mt-0 lg:h-full lg:pt-16">
              {/* Message Icon + Heading */}
              <div className="mb-4 md:mb-6">
                <Custommsg />
                <div className="flex items-start mb-2 md:mb-3 mt-3">
                  <h3 className="text-[var(--text-color-dark)] font-['Libre_Baskerville',serif] text-[24px] md:text-[32px]">
                    Let's chat
                  </h3>
                </div>
                <p className="text-[var(--text-color-dark)] text-[14px] md:text-base mb-1 font-['DM_Sans',sans-serif] leading-relaxed">
                  Don't hesitate, take the first step toward a healthier you!
                  Your journey to well-being starts with a simple connection.
                </p>
              </div>

              {/* Horizontal Line */}
              <div className="w-full h-[1px] bg-[#DEDEDE] my-6"></div>

              {/* Contact Details */}
              <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                {/* <div className="flex items-center space-x-3">
                  <Customhome />
                  <span className="text-[var(--text-color-dark)] text-[14px] md:text-[16px] font-['DM_Sans',sans-serif]">
                    123 Main Street,Banglore.
                  </span>
                </div> */}
                <div className="flex items-center space-x-3">
                  <Customcall />
                  <span className="text-[var(--text-color-dark)] text-[14px] md:text-[16px] font-['DM_Sans',sans-serif]">
                  00917207646868
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Custommail />
                  <a
                    href="mailto:info@fizeo.com"
                    className="text-[var(--text-color-dark)] text-[14px] md:text-[16px] font-['DM_Sans',sans-serif] underline"
                  >
                    Support@remdi.in

                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default GetInTouch;
